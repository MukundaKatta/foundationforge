import { describe, it, expect } from "vitest";
import { Foundationforge } from "../src/core.js";
describe("Foundationforge", () => {
  it("init", () => { expect(new Foundationforge().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Foundationforge(); await c.learn(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Foundationforge(); await c.learn(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
