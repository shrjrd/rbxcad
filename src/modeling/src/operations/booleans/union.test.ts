import type { Geom3 } from "../../geometries/types";
import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3 } from "../../geometries/index";
import { union } from "./index";

test("union empty arguments", () => {
	expect(union()).toBe(undefined);
	expect(union([])).toBe(undefined);
	expect(union([[], []])).toBe(undefined);
	expect(union(undefined!, undefined!)).toBe(undefined);
});

test("union error different geometry types", () => {
	const message = "union arguments must be the same geometry type";
	expect(() => union(geom2.create(), geom3.create())).toThrowError({ message });
});

test("union error non-geometries", () => {
	const message = "union unsupported geometry type";
	expect(() => union([1, 2, 3] as unknown as Geom3, [4, 5, 6] as unknown as Geom3)).toThrowError({ message });
	expect(() => union([], [123] as unknown as Geom3)).toThrowError({ message });
	expect(() => union("one" as unknown as Geom3, "two" as unknown as Geom3)).toThrowError({ message });
});
