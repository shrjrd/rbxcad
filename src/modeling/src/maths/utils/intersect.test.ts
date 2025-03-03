import { expect, test } from "@rbxts/jest-globals";

import * as vec2 from "../vec2/index";
import { intersect } from "./intersect";

//   A     __F
//  / \ __E
// B   D   \
//  \ /     \
//   C       G

const a = vec2.fromValues(0, 1);
const b = vec2.fromValues(-1, 0);
const c = vec2.fromValues(0, -1);
const d = vec2.fromValues(1, 0);
const e = vec2.fromValues(2, 0.5);
const f = vec2.fromValues(3, 1);
const g = vec2.fromValues(2, -1);

test("utils: intersect() for intersecting lines", () => {
	expect(intersect(a, c, b, d)).toEqual([0, 0]);
	expect(intersect(a, b, b, c)).toEqual(b);
	expect(intersect(d, f, e, g)).toEqual(e);
});

test("utils: intersect() for non-intersecting lines", () => {
	expect(intersect(a, a, b, c)).toBe(undefined);
	expect(intersect(a, d, b, c)).toBe(undefined);
	expect(intersect(a, b, d, e)).toBe(undefined);
});

test("utils: intersect() endpointTouch parameter", () => {
	// endpoint touching
	expect(intersect(a, b, b, c)).toEqual(b);
	expect(intersect(a, b, b, c, true)).toEqual(b);
	expect(intersect(a, b, b, c, false)).toEqual(undefined);
	expect(intersect(d, f, e, g)).toEqual(e);
	expect(intersect(d, f, e, g, true)).toEqual(e);
	expect(intersect(d, f, e, g, false)).toEqual(undefined);
});
