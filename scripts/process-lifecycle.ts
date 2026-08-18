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
  store.remove();
  if (record === undefined) {
    return;
  }

  const commands = processGroup.commands(record.pgid);
  if (commands.length === 0) {
    return;
  }
  const { marker } = devServerCommand(record.port);
  if (!commands.some((command) => command.includes(marker))) {
    warn(
      `Leaving process group ${record.pgid} alone: nothing in it runs \`${marker}\`, so that id belongs to something else now.`,
    );
    return;
  }

  log(`Reaping an orphaned dev server on port ${record.port} (process group ${record.pgid}).`);
  await stopProcessGroup(record.pgid, processGroup, graceMs);
};

export { devServerCommand, parseServerRecord, reapRecordedServer, stopProcessGroup };
export type { DevServerCommand, ProcessGroup, RecordStore, ServerRecord };
