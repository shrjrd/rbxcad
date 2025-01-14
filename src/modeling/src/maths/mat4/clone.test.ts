import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { clone, fromValues } from "./index";

test("mat4: clone() should return a new mat4 with same values", () => {
	const org1 = fromValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	const obs1 = clone(org1);
	expect(compareVectors(obs1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])).toBe(true);
	expect(obs1).never.toBe(org1);

	const org2 = fromValues(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
	const obs2 = clone(org2);
	expect(compareVectors(obs2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])).toBe(true);
	expect(obs2).never.toBe(org2);

	const org3 = fromValues(-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16);
	const obs3 = clone(org3);
	expect(compareVectors(obs3, [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16])).toBe(true);
	expect(obs3).never.toBe(org3);
});
