import { expect, test } from "@rbxts/jest-globals";

import { equals, fromVertices } from "./index";

test("slice: equals() should return proper value", () => {
	const sliceA = fromVertices([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	const sliceB = fromVertices([
		[0, 1],
		[1, 0],
		[1, 1],
	]);
	const sliceC = fromVertices([
		[0, 0],
		[1, 0],
		[1, 1],
		[0, 0],
	]);

	expect(equals(sliceA, sliceA)).toBe(true);

	expect(equals(sliceA, sliceB)).toBe(false);
	expect(equals(sliceB, sliceA)).toBe(false);

	expect(equals(sliceA, sliceC)).toBe(false);
	expect(equals(sliceC, sliceA)).toBe(false);
});
