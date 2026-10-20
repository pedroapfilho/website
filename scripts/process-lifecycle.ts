import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

import { Lockfile } from "next/dist/build/lockfile.js";
import { loadBindings } from "next/dist/build/swc/index.js";
import { z } from "zod";

const serverRecordSchema = z.object({
  pgid: z.number().int().gt(1),
  port: z.number().int().min(1).max(65_535),
});

type ServerRecord = z.infer<typeof serverRecordSchema>;

type RecordStore = {
  read: () => string | undefined;
  remove: () => void;
};

type ProcessGroup = {
  commands: (pgid: number) => Array<string>;
  signal: (pgid: number, signal: NodeJS.Signals) => void;
  waitForExit: (pgid: number, timeoutMs: number) => Promise<boolean>;
};

type ReapOptions = {
  graceMs: number;
  log: (message: string) => void;
  processGroup: ProcessGroup;
  store: RecordStore;
  warn: (message: string) => void;
};

type DevServerCommand = {
  argv: Array<string>;
  marker: string;
};

const devServerCommand = (port: number): DevServerCommand => {
  const argv = ["next", "dev", "-p", String(port)];
  return { argv, marker: argv.join(" ") };
};

const parseServerRecord = (text: string | undefined): ServerRecord | undefined => {
  if (text === undefined) {
    return undefined;
  }
  try {
    const result = serverRecordSchema.safeParse(JSON.parse(text));
    return result.success ? result.data : undefined;
  } catch {
    return undefined;
  }
};

const stopProcessGroup = async (
  pgid: number,
  processGroup: ProcessGroup,
  graceMs: number,
): Promise<void> => {
  processGroup.signal(pgid, "SIGTERM");
  if (await processGroup.waitForExit(pgid, graceMs)) {
    return;
  }
  processGroup.signal(pgid, "SIGKILL");
  if (!(await processGroup.waitForExit(pgid, graceMs))) {
    throw new Error(
      `Could not stop the dev server in process group ${pgid}; stop it by hand and retry.`,
    );
  }
};

const reapRecordedServer = async ({
  graceMs,
  log,
  processGroup,
  store,
  warn,
}: ReapOptions): Promise<void> => {
  const record = parseServerRecord(store.read());
  if (record !== undefined) {
    const commands = processGroup.commands(record.pgid);
    const { marker } = devServerCommand(record.port);
    if (commands.some((command) => command.includes(marker))) {
      log(`Reaping an orphaned dev server on port ${record.port} (process group ${record.pgid}).`);
      await stopProcessGroup(record.pgid, processGroup, graceMs);
    } else if (commands.length > 0) {
      warn(
        `Leaving process group ${record.pgid} alone: nothing in it runs \`${marker}\`, so that id belongs to something else now.`,
      );
    }
  }
  store.remove();
};

const acquireServerLifecycle = async ({
  graceMs,
  log,
  processGroup,
  recordPath,
  warn,
}: Omit<ReapOptions, "store"> & { recordPath: string }) => {
  const bindings = await loadBindings();
  if (bindings.isWasm) {
    throw new Error(
      "Resume generation requires native Next.js bindings for exclusive server ownership.",
    );
  }
  mkdirSync(path.dirname(recordPath), { recursive: true });
  const lock = Lockfile.tryAcquire(`${recordPath}.lock`, false);
  if (lock === undefined) {
    throw new Error(
      "Another resume generation is active in this project; wait for it to finish and retry.",
    );
  }

  const store: RecordStore = {
    read: () => {
      try {
        return readFileSync(recordPath, "utf8");
      } catch (error) {
        if (error instanceof Error && "code" in error && error.code === "ENOENT") {
          return undefined;
        }
        throw error;
      }
    },
    remove: () => {
      rmSync(recordPath, { force: true });
    },
  };
  let server: ServerRecord | undefined;
  let closing: Promise<void> | undefined;

  const onExit = (): void => {
    try {
      if (server !== undefined) {
        processGroup.signal(server.pgid, "SIGKILL");
      }
    } finally {
      lock.unlockSync();
    }
  };
  process.once("exit", onExit);

  const release = async (): Promise<void> => {
    try {
      if (server !== undefined) {
        await stopProcessGroup(server.pgid, processGroup, graceMs);
        server = undefined;
        store.remove();
      }
    } finally {
      process.off("exit", onExit);
      lock.unlockSync();
    }
  };
  const close = (): Promise<void> => (closing ??= release());

  try {
    await reapRecordedServer({ graceMs, log, processGroup, store, warn });
  } catch (error) {
    await close();
    throw error;
  }

  return {
    close,
    record: (record: ServerRecord): void => {
      if (closing !== undefined) {
        throw new Error("Resume server ownership has already been released.");
      }
      server = record;
      writeFileSync(recordPath, JSON.stringify(record));
    },
  };
};

type ServerLifecycle = Awaited<ReturnType<typeof acquireServerLifecycle>>;

export {
  acquireServerLifecycle,
  devServerCommand,
  parseServerRecord,
  reapRecordedServer,
  stopProcessGroup,
};
export type { ProcessGroup, RecordStore, ServerLifecycle };
