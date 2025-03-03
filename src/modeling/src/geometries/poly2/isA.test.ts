import { expect, test } from "@rbxts/jest-globals";

import * as geom2 from "../geom2/index";
import * as geom3 from "../geom3/index";
import * as poly3 from "../poly3/index";
import { create, isA } from "./index";

test("isA: identifies created poly2", () => {
	const p1 = create();
	const p2 = create([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	expect(isA(p1)).toBe(true);
	expect(isA(p2)).toBe(true);
});

test("isA: identifies non poly2", () => {
	const p1 = undefined;
	const p2 = {};
	const p3 = { points: 1 };
	const p4 = { vertices: 1 };
	const p5 = geom2.create();
	const p6 = geom3.create();
	const p7 = poly3.create();
	expect(isA(p1!)).toBe(false);
	expect(isA(p2)).toBe(false);
	expect(isA(p3)).toBe(false);
	expect(isA(p4)).toBe(false);
	expect(isA(p5)).toBe(false);
	expect(isA(p6)).toBe(false);
	expect(isA(p7)).toBe(false);
});
