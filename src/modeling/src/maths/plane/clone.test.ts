import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { clone, fromValues } from "./index";

test("plane: clone() with one param should update a new plane with same values", () => {
	const plane1 = fromValues(0, 0, 0, 0);
	const ret1 = clone(plane1);
	expect(compareVectors(plane1, [0, 0, 0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0, 0, 0])).toBe(true);
	expect(ret1).never.toBe(plane1);

	const plane2 = fromValues(1, 2, 3, 4);
	const ret2 = clone(plane2);
	expect(compareVectors(plane2, [1, 2, 3, 4])).toBe(true);
	expect(compareVectors(ret2, [1, 2, 3, 4])).toBe(true);
	expect(ret2).never.toBe(plane2);

	const plane3 = fromValues(-1, -2, -3, -4);
	const ret3 = clone(plane3);
	expect(compareVectors(plane3, [-1, -2, -3, -4])).toBe(true);
	expect(compareVectors(ret3, [-1, -2, -3, -4])).toBe(true);
	expect(ret3).never.toBe(plane3);
});
