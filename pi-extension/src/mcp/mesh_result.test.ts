import { describe, expect, test } from "vitest";
import * as removedClaudeMeshHelpers from "./mesh_result.js";

describe("removed Claude mesh launcher helpers", () => {
  test("the standalone CLI no longer exposes a Claude mesh launcher", () => {
    expect(Object.keys(removedClaudeMeshHelpers)).toEqual([]);
  });
});
