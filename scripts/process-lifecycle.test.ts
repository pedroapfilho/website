import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, it, mock, type TestContext } from "node:test";

import {
  acquireServerLifecycle,
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

  void it("keeps recovery metadata until shutdown is confirmed", async () => {
    const { processGroup } = createProcessGroup([true]);
    const { remove, store } = createStore('{"pgid":42,"port":3000}');
    processGroup.waitForExit = () => {
      assert.equal(remove.mock.callCount(), 0);
      return Promise.resolve(true);
    };
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

const temporaryRecord = (t: TestContext): string => {
  const directory = mkdtempSync(path.join(tmpdir(), "website-resume-lifecycle-"));
  t.after(() => {
    rmSync(directory, { force: true, recursive: true });
  });
  return path.join(directory, "server.json");
};

const lifecycleOptions = (recordPath: string, waitResults: Array<boolean> = []) => {
  const { processGroup, signal } = createProcessGroup(waitResults);
  return {
    graceMs: 10,
    log: mock.fn(),
    processGroup,
    recordPath,
    signal,
    warn: mock.fn(),
  };
};

const spawnOwner = (t: TestContext, recordPath: string) => {
  const child = spawn(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `
    import { acquireServerLifecycle } from "#scripts/process-lifecycle";
    try {
      const owner = await acquireServerLifecycle({
        recordPath: process.argv[1],
        graceMs: 10,
        log: () => {},
        warn: () => {},
        processGroup: {
          commands: () => [],
          signal: () => {},
          waitForExit: async () => true,
        },
      });
      process.send("acquired");
      process.on("message", async () => {
        await owner.close();
        process.exit(0);
      });
    } catch (error) {
      process.send(error.message);
      process.exit(1);
    }
  `,
      recordPath,
    ],
    { stdio: ["ignore", "pipe", "pipe", "ipc"] },
  );
  t.after(async () => {
    if (child.exitCode === null && child.signalCode === null) {
      const exited = once(child, "exit");
      child.kill("SIGKILL");
      await exited;
    }
  });
  return { child, result: once(child, "message") };
};

void describe("exclusive resume server ownership", () => {
  void it("rejects a live owner before inspecting its server record", async (t) => {
    const recordPath = temporaryRecord(t);
    const options = lifecycleOptions(recordPath);
    const owner = await acquireServerLifecycle(options);
    t.after(owner.close);
    owner.record({ pgid: 42, port: 3000 });
    const previousRecord = readFileSync(recordPath, "utf8");
    options.processGroup.commands = () => {
      assert.fail("a competing generation must not inspect a live owner's server");
    };

    await assert.rejects(acquireServerLifecycle(options), /Another resume generation is active/);
    assert.equal(readFileSync(recordPath, "utf8"), previousRecord);
    assert.equal(options.signal.mock.callCount(), 0);
  });

  void it("allows exactly one of two concurrent processes to acquire ownership", async (t) => {
    const recordPath = temporaryRecord(t);
    const first = spawnOwner(t, recordPath);
    const second = spawnOwner(t, recordPath);
    const messages = await Promise.all([first.result, second.result]);
    const results = messages.map(([message]) => String(message));
    assert.equal(results.filter((result) => result === "acquired").length, 1);
    assert.equal(
      results.filter((result) => result.includes("Another resume generation is active")).length,
      1,
    );
  });

  void it("reacquires after an owner is killed and reaps its stale server", async (t) => {
    const recordPath = temporaryRecord(t);
    const { child, result } = spawnOwner(t, recordPath);
    const [message] = await result;
    assert.equal(message, "acquired");
    writeFileSync(recordPath, '{"pgid":42,"port":3000}');
    const exited = once(child, "exit");
    child.kill("SIGKILL");
    await exited;

    const options = lifecycleOptions(recordPath);
    const owner = await acquireServerLifecycle(options);
    t.after(owner.close);
    assert.deepEqual(
      options.signal.mock.calls.map(({ arguments: args }) => args),
      [[42, "SIGTERM"]],
    );
    assert.equal(existsSync(recordPath), false);
  });

  void it("does not let an older owner remove or signal a newer owner's server", async (t) => {
    const recordPath = temporaryRecord(t);
    const firstOptions = lifecycleOptions(recordPath);
    const first = await acquireServerLifecycle(firstOptions);
    first.record({ pgid: 42, port: 3000 });
    await first.close();

    const secondOptions = lifecycleOptions(recordPath);
    const second = await acquireServerLifecycle(secondOptions);
    t.after(second.close);
    second.record({ pgid: 43, port: 3001 });
    const previousRecord = readFileSync(recordPath, "utf8");
    await first.close();
    assert.throws(() => {
      first.record({ pgid: 44, port: 3002 });
    }, /ownership has already been released/);
    assert.equal(readFileSync(recordPath, "utf8"), previousRecord);
    assert.equal(firstOptions.signal.mock.callCount(), 1);
    assert.equal(secondOptions.signal.mock.callCount(), 0);
  });

  void it("retains failed orphan shutdown metadata for the next acquisition to retry", async (t) => {
    const recordPath = temporaryRecord(t);
    const record = '{"pgid":42,"port":3000}';
    writeFileSync(recordPath, record);
    const failedOptions = lifecycleOptions(recordPath, [false, false]);
    await assert.rejects(acquireServerLifecycle(failedOptions), /Could not stop the dev server/);
    assert.equal(readFileSync(recordPath, "utf8"), record);
    assert.equal(failedOptions.signal.mock.callCount(), 2);

    const options = lifecycleOptions(recordPath);
    const owner = await acquireServerLifecycle(options);
    t.after(owner.close);
    assert.equal(options.signal.mock.callCount(), 1);
    assert.equal(existsSync(recordPath), false);
  });

  void it("retains failed owner shutdown metadata and releases the lock for recovery", async (t) => {
    const recordPath = temporaryRecord(t);
    const options = lifecycleOptions(recordPath, [false, false]);
    const owner = await acquireServerLifecycle(options);
    owner.record({ pgid: 42, port: 3000 });
    await assert.rejects(owner.close(), /Could not stop the dev server/);
    assert.deepEqual(JSON.parse(readFileSync(recordPath, "utf8")), { pgid: 42, port: 3000 });

    const recovered = await acquireServerLifecycle(lifecycleOptions(recordPath));
    t.after(recovered.close);
    assert.equal(existsSync(recordPath), false);
  });

  void it("keeps ownership while shutdown is waiting for the server to exit", async (t) => {
    const recordPath = temporaryRecord(t);
    const options = lifecycleOptions(recordPath);
    const exited = Promise.withResolvers<boolean>();
    options.processGroup.waitForExit = () => exited.promise;
    const owner = await acquireServerLifecycle(options);
    owner.record({ pgid: 42, port: 3000 });
    const closing = owner.close();
    try {
      await assert.rejects(acquireServerLifecycle(options), /Another resume generation is active/);
      assert.equal(existsSync(recordPath), true);
    } finally {
      exited.resolve(true);
      await closing;
    }
    const next = await acquireServerLifecycle(lifecycleOptions(recordPath));
    await next.close();
  });

  void it("removes its own record after a normal shutdown", async (t) => {
    const recordPath = temporaryRecord(t);
    const options = lifecycleOptions(recordPath);
    const owner = await acquireServerLifecycle(options);
    owner.record({ pgid: 42, port: 3000 });
    await owner.close();
    assert.equal(existsSync(recordPath), false);
    assert.equal(options.signal.mock.callCount(), 1);
  });
});
