import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { copy, create, fromValues } from "./index";

test("vec4: copy() with two params should update a vec4 with same values", () => {
	const org1 = create();
	const mat1 = fromValues(0, 0, 0, 0);
	const ret1 = copy(org1, mat1);
	expect(compareVectors(org1, [0, 0, 0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0, 0, 0])).toBe(true);
	expect(ret1).never.toBe(mat1);
	expect(ret1).toBe(org1);

	const org2 = create();
	const mat2 = fromValues(1, 2, 3, 4);
	const ret2 = copy(org2, mat2);
	expect(compareVectors(org2, [1, 2, 3, 4])).toBe(true);
	expect(compareVectors(ret2, [1, 2, 3, 4])).toBe(true);
	expect(ret2).never.toBe(mat2);
	expect(ret2).toBe(org2);

	const org3 = create();
	const mat3 = fromValues(-1, -2, -3, -4);
	const ret3 = copy(org3, mat3);
	expect(compareVectors(org3, [-1, -2, -3, -4])).toBe(true);
	expect(compareVectors(ret3, [-1, -2, -3, -4])).toBe(true);
	expect(ret3).never.toBe(mat3);
	expect(ret3).toBe(org3);
});
