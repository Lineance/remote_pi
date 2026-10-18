import type { ThinkingLevel } from "../protocol/types.js";

export type RemoteSlashCommand =
  | { kind: "compact"; instructions?: string }
  | { kind: "model"; argument: string }
  | { kind: "thinking"; argument: string }
  | { kind: "remote-pi"; arguments: string };

const commandNames = new Set(["compact", "model", "thinking", "remote-pi"]);

/** Parse only explicitly remote-enabled slash commands; unknown text stays a prompt. */
export function parseRemoteSlashCommand(text: string): RemoteSlashCommand | null {
  const input = text.trimStart();
  if (!input.startsWith("/")) return null;

  const boundary = input.search(/\s/);
  const name = (boundary < 0 ? input.slice(1) : input.slice(1, boundary)).toLowerCase();
  if (!commandNames.has(name)) return null;
  const args = boundary < 0 ? "" : input.slice(boundary).trim();

  switch (name) {
    case "compact":
      return { kind: "compact", ...(args ? { instructions: args } : {}) };
    case "model":
      return { kind: "model", argument: args };
    case "thinking":
      return { kind: "thinking", argument: args };
    case "remote-pi":
      return { kind: "remote-pi", arguments: args };
  }
  return null;
}

export const remoteThinkingLevels: readonly ThinkingLevel[] = [
  "off", "minimal", "low", "medium", "high", "xhigh",
];

export const remotePiCommandHelp = [
  "/compact [instructions]",
  "/model <provider>/<model-id>",
  "/thinking <off|minimal|low|medium|high|xhigh>",
  "/remote-pi commands",
  "/remote-pi <status|config|peers|devices>",
  "/remote-pi set-relay <url>",
  "/remote-pi relay <status|start|url <url>>",
] as const;

export function isRemoteThinkingLevel(value: string): value is ThinkingLevel {
  return remoteThinkingLevels.includes(value as ThinkingLevel);
}
