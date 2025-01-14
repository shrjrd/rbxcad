import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { copy, create, fromValues } from "./index";

test("vec3: copy() with two params should update a vec3 with same values", () => {
	const vec1 = create();
	const org1 = fromValues(0, 0, 0);
	const ret1 = copy(vec1, org1);
	expect(compareVectors(vec1, [0, 0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0, 0])).toBe(true);
	expect(ret1).never.toBe(org1);

	const vec2 = create();
	const org2 = fromValues(1, 2, 3);
	const ret2 = copy(vec2, org2);
	expect(compareVectors(vec2, [1, 2, 3])).toBe(true);
	expect(compareVectors(ret2, [1, 2, 3])).toBe(true);
	expect(ret2).never.toBe(org2);

	const vec3 = create();
	const org3 = fromValues(-1, -2, -3);
	const ret3 = copy(vec3, org3);
	expect(compareVectors(vec3, [-1, -2, -3])).toBe(true);
	expect(compareVectors(ret3, [-1, -2, -3])).toBe(true);
	expect(ret3).never.toBe(org3);
});
