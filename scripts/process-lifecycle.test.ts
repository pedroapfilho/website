import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";

import {
  devServerCommand,
  parseServerRecord,
  reapRecordedServer,
  stopProcessGroup,
} from "#scripts/process-lifecycle";
import type { ProcessGroup, RecordStore } from "#scripts/process-lifecycle";

const createProcessGroup = (waitResults: Array<boolean>) => {
  const signal = mock.fn<(pgid: number, signal: NodeJS.Signals) => void>();
  const waitForExit = mock.fn(() => Promise.resolve(waitResults.shift() ?? true));
  const processGroup: ProcessGroup = {
    commands: () => [`node ${devServerCommand(3000).marker}`],
    signal,
    waitForExit,
  };
  return { processGroup, signal, waitForExit };
};

const createStore = (value: string | undefined) => {
  const remove = mock.fn<() => void>();
  const store: RecordStore = { read: () => value, remove };
  return { remove, store };
};

void describe("process lifecycle", () => {
  void it("rejects malformed and unsafe records", () => {
    assert.equal(parseServerRecord("not json"), undefined);
    assert.equal(parseServerRecord("null"), undefined);
    assert.equal(parseServerRecord('{"pgid":1,"port":3000}'), undefined);
    assert.equal(parseServerRecord('{"pgid":42,"port":"3000"}'), undefined);
  });

  void it("rejects ports that could never match a marker", () => {
    assert.equal(parseServerRecord('{"pgid":42,"port":0}'), undefined);
    assert.equal(parseServerRecord('{"pgid":42,"port":-5}'), undefined);
    assert.equal(parseServerRecord('{"pgid":42,"port":70000}'), undefined);
    assert.deepEqual(parseServerRecord('{"pgid":42,"port":65535}'), {
      pgid: 42,
      port: 65_535,
    });
  });

  void it("builds a marker the spawned command line contains", () => {
    const { argv, marker } = devServerCommand(54_321);
    assert.ok(["pnpm", "exec", ...argv].join(" ").includes(marker));
  });

  void it("leaves a reused process group without the ownership marker alone", async () => {
    const { processGroup, signal } = createProcessGroup([]);
    processGroup.commands = () => ["node unrelated-service.js"];
    const { remove, store } = createStore('{"pgid":42,"port":3000}');
    const warn = mock.fn<(message: string) => void>();

    await reapRecordedServer({
      graceMs: 10,
      log: mock.fn(),
      processGroup,
      store,
      warn,
    });

    assert.equal(signal.mock.callCount(), 0);
    assert.equal(remove.mock.callCount(), 1);
    assert.equal(warn.mock.callCount(), 1);
  });

  void it("says nothing when the recorded group is already empty", async () => {
    const { processGroup, signal } = createProcessGroup([]);
    processGroup.commands = () => [];
    const { remove, store } = createStore('{"pgid":42,"port":3000}');
    const warn = mock.fn<(message: string) => void>();

    await reapRecordedServer({
      graceMs: 10,
      log: mock.fn(),
      processGroup,
      store,
      warn,
    });

    assert.equal(signal.mock.callCount(), 0);
    assert.equal(remove.mock.callCount(), 1);
    assert.equal(warn.mock.callCount(), 0);
  });

  void it("stops after TERM succeeds", async () => {
    const { processGroup, signal } = createProcessGroup([true]);
    await stopProcessGroup(42, processGroup, 10);
    assert.deepEqual(
      signal.mock.calls.map(({ arguments: args }) => args),
      [[42, "SIGTERM"]],
    );
  });

  void it("escalates once when TERM times out", async () => {
    const { processGroup, signal } = createProcessGroup([false, true]);
    await stopProcessGroup(42, processGroup, 10);
    assert.deepEqual(
      signal.mock.calls.map(({ arguments: args }) => args),
      [
        [42, "SIGTERM"],
        [42, "SIGKILL"],
      ],
    );
  });

  void it("removes an owned record before reaping", async () => {
    const { processGroup } = createProcessGroup([true]);
    const { remove, store } = createStore('{"pgid":42,"port":3000}');
    await reapRecordedServer({
      graceMs: 10,
      log: mock.fn(),
      processGroup,
      store,
      warn: mock.fn(),
    });
    assert.equal(remove.mock.callCount(), 1);
  });
});
