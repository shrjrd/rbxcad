import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { copy, create, fromValues } from "./index";

test("line2: copy() with two params should update a line2 with same values", () => {
	const line1 = create();
	const org1 = fromValues(0, 0, 0);
	const ret1 = copy(line1, org1);
	expect(compareVectors(line1, [0, 0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0, 0])).toBe(true);
	expect(ret1).never.toBe(org1);

	const line2 = create();
	const org2 = fromValues(1, 2, 3);
	const ret2 = copy(line2, org2);
	expect(compareVectors(line2, [1, 2, 3])).toBe(true);
	expect(compareVectors(ret2, [1, 2, 3])).toBe(true);
	expect(ret2).never.toBe(org2);

	const line3 = create();
	const org3 = fromValues(-1, -2, -3);
	const ret3 = copy(line3, org3);
	expect(compareVectors(line3, [-1, -2, -3])).toBe(true);
	expect(compareVectors(ret3, [-1, -2, -3])).toBe(true);
	expect(ret3).never.toBe(org3);
});
