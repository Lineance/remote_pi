import { describe, expect, test } from "vitest";
import { parseRemoteSlashCommand, remotePiCommandHelp } from "./remote_commands.js";

describe("parseRemoteSlashCommand", () => {
  test("recognizes compact and preserves its optional instruction text", () => {
    expect(parseRemoteSlashCommand("/compact")).toEqual({ kind: "compact" });
    expect(parseRemoteSlashCommand("/compact summarize decisions in English")).toEqual({
      kind: "compact",
      instructions: "summarize decisions in English",
    });
  });

  test("recognizes direct model/thinking selections and remote-pi arguments", () => {
    expect(parseRemoteSlashCommand("/model anthropic/claude-sonnet-4-5")).toEqual({
      kind: "model",
      argument: "anthropic/claude-sonnet-4-5",
    });
    expect(parseRemoteSlashCommand("/thinking high")).toEqual({
      kind: "thinking",
      argument: "high",
    });
    expect(parseRemoteSlashCommand("/remote-pi relay status")).toEqual({
      kind: "remote-pi",
      arguments: "relay status",
    });
  });

  test("does not capture ordinary text or unlisted slash commands", () => {
    expect(parseRemoteSlashCommand("please /compact this")).toBeNull();
    expect(parseRemoteSlashCommand("/settings")).toBeNull();
    expect(parseRemoteSlashCommand("/compactly")).toBeNull();
  });

  test("documents the server allowlist", () => {
    expect(remotePiCommandHelp).toContain("/compact [instructions]");
    expect(remotePiCommandHelp).toContain("/remote-pi commands");
  });
});
