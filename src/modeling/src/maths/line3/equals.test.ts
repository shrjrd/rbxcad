import { expect, test } from "@rbxts/jest-globals";

import { create, equals, fromPointAndDirection } from "./index";

test("line3: equals() should return correct booleans", () => {
	const line0 = fromPointAndDirection(create(), [0, 0, 0], [1, 1, 1]);
	const line1 = fromPointAndDirection(create(), [0, 0, 0], [1, 1, 1]);
	expect(equals(line0, line1)).toBe(true);

	const line2 = fromPointAndDirection(create(), [0, 0, 0], [0, 1, 0]);
	expect(equals(line0, line2)).toBe(false);

	const line3 = fromPointAndDirection(create(), [1, 0, 1], [0, 0, 0]);
	expect(equals(line0, line3)).toBe(false);

	const line4 = fromPointAndDirection(create(), [1, 1, 1], [1, 1, 1]);
	expect(equals(line0, line4)).toBe(false);
});
