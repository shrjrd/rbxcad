import type { Geom3 } from "../../geometries/types";
import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3 } from "../../geometries/index";
import { subtract } from "./index";

test("subtract empty arguments", () => {
	expect(subtract()).toBe(undefined);
	expect(subtract([])).toBe(undefined);
	expect(subtract([[], []])).toBe(undefined);
	expect(subtract(undefined!, undefined!)).toBe(undefined);
});

test("subtract error different geometry types", () => {
	const message = "subtract arguments must be the same geometry type";
	expect(() => subtract(geom2.create(), geom3.create())).toThrowError({ message });
});

test("subtract error non-geometries", () => {
	const message = "subtract unsupported geometry type";
	expect(() => subtract([1, 2, 3] as unknown as Geom3, [4, 5, 6] as unknown as Geom3)).toThrowError({ message });
	expect(() => subtract([], [123] as unknown as Geom3)).toThrowError({ message });
	expect(() => subtract("one" as unknown as Geom3, "two" as unknown as Geom3)).toThrowError({ message });
});
