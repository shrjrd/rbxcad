import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, orthogonal } from "./index";

test("vec3: orthogonal() with two params should update a vec3 with correct values", () => {
	const org1 = create();
	const ret1 = orthogonal(org1, [0, 0, 0]);
	expect(compareVectors(org1, [0, 0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0, 0])).toBe(true);
	expect(org1).toBe(ret1);

	const org2 = create();
	const ret2 = orthogonal(org2, [3, 1, 3]);
	expect(compareVectors(org2, [-3, 0, 3])).toBe(true);
	expect(compareVectors(ret2, [-3, 0, 3])).toBe(true);
	expect(org2).toBe(ret2);

	const org3 = create();
	const ret3 = orthogonal(org3, [3, 2, 1]);
	expect(compareVectors(org3, [2, -3, 0])).toBe(true);
	expect(compareVectors(ret3, [2, -3, 0])).toBe(true);
	expect(org3).toBe(ret3);
});
