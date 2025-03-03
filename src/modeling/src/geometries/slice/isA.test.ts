import { expect, test } from "@rbxts/jest-globals";

import { create, fromVertices, isA } from "./index";

test("isA: identifies created slice", () => {
	const p1 = create();
	const p2 = fromVertices([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	expect(isA(p1)).toBe(true);
	expect(isA(p2)).toBe(true);
});

test("isA: identifies non slice", () => {
	const p1 = undefined;
	const p2 = {};
	const p3 = { edges: 1 };
	expect(isA(p1!)).toBe(false);
	expect(isA(p2)).toBe(false);
	expect(isA(p3)).toBe(false);
});
