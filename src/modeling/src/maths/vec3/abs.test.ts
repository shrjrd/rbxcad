import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { abs, create } from "./index";

test("vec3: abs() with two params should update a vec3 with correct values", () => {
	const org1 = create();
	const ret1 = abs(org1, [0, 0, 0]);
	expect(compareVectors(org1, [0, 0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0, 0])).toBe(true);
	expect(org1).toBe(ret1);

	const org2 = create();
	const ret2 = abs(org2, [1, 2, 3]);
	expect(compareVectors(org2, [1, 2, 3])).toBe(true);
	expect(compareVectors(ret2, [1, 2, 3])).toBe(true);
	expect(org2).toBe(ret2);

	const org3 = create();
	const ret3 = abs(org3, [-1, -2, -3]);
	expect(compareVectors(org3, [1, 2, 3])).toBe(true);
	expect(compareVectors(ret3, [1, 2, 3])).toBe(true);
	expect(org3).toBe(ret3);
});
