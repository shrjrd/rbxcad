import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { copy, create, fromValues } from "./index";

test("vec2: copy() with two params should update a vec2 with same values", () => {
	const out1 = create();
	const org1 = fromValues(0, 0);
	const ret1 = copy(out1, org1);
	expect(compareVectors(out1, [0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0])).toBe(true);
	expect(ret1).never.toBe(org1);
	expect(out1).toBe(ret1);

	const out2 = create();
	const org2 = fromValues(1, 2);
	const ret2 = copy(out2, org2);
	expect(compareVectors(out2, [1, 2])).toBe(true);
	expect(compareVectors(ret2, [1, 2])).toBe(true);
	expect(ret2).never.toBe(org2);
	expect(out2).toBe(ret2);

	const out3 = create();
	const org3 = fromValues(-1, -2);
	const ret3 = copy(out3, org3);
	expect(compareVectors(out3, [-1, -2])).toBe(true);
	expect(compareVectors(ret3, [-1, -2])).toBe(true);
	expect(ret3).never.toBe(org3);
	expect(out3).toBe(ret3);
});
