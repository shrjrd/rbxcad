import { expect, test } from "@rbxts/jest-globals";

import { equals, fromValues } from "./index";

test("plane: equals() should return correct booleans", () => {
	const plane0 = fromValues(0, 0, 0, 0);
	const plane1 = fromValues(0, 0, 0, 0);
	expect(equals(plane0, plane1)).toBe(true);

	const plane2 = fromValues(1, 1, 1, 1);
	expect(equals(plane0, plane2)).toBe(false);

	const plane3 = fromValues(0, 1, 1, 0);
	expect(equals(plane0, plane3)).toBe(false);

	const plane4 = fromValues(0, 0, 1, 1);
	expect(equals(plane0, plane4)).toBe(false);
});
