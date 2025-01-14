import { expect, test } from "@rbxts/jest-globals";

import { equals, fromValues } from "./index";

test("line2: equals() should return correct booleans", () => {
	const line0 = fromValues(0, 0, 0);
	const line1 = fromValues(0, 0, 0);
	expect(equals(line0, line1)).toBe(true);

	const line2 = fromValues(1, 1, 1);
	expect(equals(line0, line2)).toBe(false);

	const line3 = fromValues(1, 1, 0);
	expect(equals(line0, line3)).toBe(false);

	const line4 = fromValues(0, 1, 1);
	expect(equals(line0, line4)).toBe(false);

	const line5 = fromValues(1, 0, 0);
	expect(equals(line0, line5)).toBe(false);

	const line6 = fromValues(0, 1, 0);
	expect(equals(line0, line6)).toBe(false);

	const line7 = fromValues(0, 0, 1);
	expect(equals(line0, line7)).toBe(false);
});
