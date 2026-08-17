type ServerRecord = { pgid: number; port: number };

type RecordStore = {
  read: () => unknown;
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

/**
 * The single spelling of the dev-server invocation. `argv` launches it and
 * `marker` identifies it in `ps` output, so an edit to one cannot desync the
 * other and leave `reapRecordedServer` disowning a group it started.
 */
const devServerCommand = (port: number): DevServerCommand => {
  const argv = ["next", "dev", "-p", String(port)];
  return { argv, marker: argv.join(" ") };
};

const parseServerRecord = (value: unknown): ServerRecord | undefined => {
  if (typeof value !== "object" || value === null || !("pgid" in value) || !("port" in value)) {
    return undefined;
  }
  const { pgid, port } = value;
  if (typeof pgid !== "number" || !Number.isInteger(pgid) || pgid <= 1) {
    return undefined;
  }
  if (typeof port !== "number" || !Number.isInteger(port) || port < 1 || port > 65_535) {
    return undefined;
  }
  return { pgid, port };
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
