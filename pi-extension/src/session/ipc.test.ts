import { describe, expect, test } from "vitest";
import { ipcAddress, usesNamedPipe } from "./ipc.js";

describe("usesNamedPipe", () => {
  test("true only on win32", () => {
    expect(usesNamedPipe("win32")).toBe(true);
    expect(usesNamedPipe("darwin")).toBe(false);
    expect(usesNamedPipe("linux")).toBe(false);
  });
});

describe("ipcAddress", () => {
  test("POSIX → returns the filesystem path unchanged", () => {
    const p = "/home/u/.pi/remote/locks/cwd.sock";
    expect(ipcAddress("lock-cwd", p, "darwin", "u")).toBe(p);
    expect(ipcAddress("lock-cwd", p, "linux", "u")).toBe(p);
  });

  test("Windows → per-user named pipe", () => {
    expect(ipcAddress("lock-cwd", "/ignored.sock", "win32", "jacob"))
      .toBe("\\\\.\\pipe\\remote-pi-lock-cwd-jacob");
    expect(ipcAddress("broker-local", "/ignored.sock", "win32", "alice"))
      .toBe("\\\\.\\pipe\\remote-pi-broker-local-alice");
  });

  test("Windows → sanitizes unsafe chars in suffix + user", () => {
    expect(ipcAddress("broker local", "/x", "win32", "DOMAIN\\user"))
      .toBe("\\\\.\\pipe\\remote-pi-broker_local-DOMAIN_user");
  });

  test("Windows → falls back to 'user' when username is empty", () => {
    expect(ipcAddress("lock-cwd", "/x", "win32", "")).toBe("\\\\.\\pipe\\remote-pi-lock-cwd-user");
  });
});
