import { expect, test } from "@rbxts/jest-globals";

import { create, fromPoints, isA } from "./index";

test("isA: identifies created geom2", () => {
	const p1 = create();
	const p2 = fromPoints([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	expect(isA(p1)).toBe(true);
	expect(isA(p2)).toBe(true);
});

test("isA: identifies non geom2", () => {
	const p1 = undefined;
	const p2 = {};
	const p3 = { sides: 1, transforms: 1 };
	expect(isA(p1!)).toBe(false);
	expect(isA(p2)).toBe(false);
	expect(isA(p3)).toBe(false);
});
