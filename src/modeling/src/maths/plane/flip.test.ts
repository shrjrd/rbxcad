import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, flip } from "./index";

test("plane: flip() called with two parameters should update a plane with correct values", () => {
	const org1 = create();
	const ret1 = flip(org1, [0, 0, 0, 0]);
	expect(compareVectors(org1, [-0, -0, -0, -0])).toBe(true);
	expect(compareVectors(ret1, [-0, -0, -0, -0])).toBe(true);

	const org2 = create();
	const ret2 = flip(org2, [1, 2, 3, 4]);
	expect(compareVectors(org2, [-1, -2, -3, -4])).toBe(true);
	expect(compareVectors(ret2, [-1, -2, -3, -4])).toBe(true);

	const org3 = create();
	const ret3 = flip(org3, [-1, -2, -3, -4]);
	expect(compareVectors(org3, [1, 2, 3, 4])).toBe(true);
	expect(compareVectors(ret3, [1, 2, 3, 4])).toBe(true);

	const org4 = create();
	const ret4 = flip(org4, [-1, 2, -3, 4]);
	expect(compareVectors(org4, [1, -2, 3, -4])).toBe(true);
	expect(compareVectors(ret4, [1, -2, 3, -4])).toBe(true);
});
