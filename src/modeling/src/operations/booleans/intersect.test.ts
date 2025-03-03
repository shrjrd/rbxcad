import type { Geom3 } from "../../geometries/types";
import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3 } from "../../geometries/index";
import { intersect } from "./index";

test("intersect empty arguments", () => {
	expect(intersect()).toBe(undefined);
	expect(intersect([])).toBe(undefined);
	expect(intersect([[], []])).toBe(undefined);
	expect(intersect(undefined!, undefined!)).toBe(undefined);
});

test("intersect error different geometry types", () => {
	const message = "intersect arguments must be the same geometry type";
	expect(() => intersect(geom2.create(), geom3.create())).toThrowError({ message });
});

test("intersect error non-geometries", () => {
	const message = "intersect unsupported geometry type";
	expect(() => intersect([1, 2, 3] as unknown as Geom3, [4, 5, 6] as unknown as Geom3)).toThrowError({ message });
	expect(() => intersect([], [123] as unknown as Geom3)).toThrowError({ message });
	expect(() => intersect("one" as unknown as Geom3, "two" as unknown as Geom3)).toThrowError({ message });
});
