import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { copy, create, fromValues } from "./index";

test("plane: copy() with two params should update a plane with same values", () => {
	const org1 = create();
	const plane1 = fromValues(0, 0, 0, 0);
	const ret1 = copy(org1, plane1);
	expect(compareVectors(org1, [0, 0, 0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0, 0, 0])).toBe(true);
	expect(ret1).never.toBe(plane1);
	expect(ret1).toBe(org1);

	const org2 = create();
	const plane2 = fromValues(1, 2, 3, 4);
	const ret2 = copy(org2, plane2);
	expect(compareVectors(org2, [1, 2, 3, 4])).toBe(true);
	expect(compareVectors(ret2, [1, 2, 3, 4])).toBe(true);
	expect(ret2).never.toBe(plane2);
	expect(ret2).toBe(org2);

	const org3 = create();
	const plane3 = fromValues(-1, -2, -3, -4);
	const ret3 = copy(org3, plane3);
	expect(compareVectors(org3, [-1, -2, -3, -4])).toBe(true);
	expect(compareVectors(ret3, [-1, -2, -3, -4])).toBe(true);
	expect(ret3).never.toBe(plane3);
	expect(ret3).toBe(org3);
});
