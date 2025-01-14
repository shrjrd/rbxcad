import { expect, test } from "@rbxts/jest-globals";

import { equals, fromPoints } from "./index";

test("slice: equals() should return proper value", () => {
	const sliceA = fromPoints([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	const sliceB = fromPoints([
		[0, 1],
		[1, 0],
		[1, 1],
	]);
	const sliceC = fromPoints([
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
