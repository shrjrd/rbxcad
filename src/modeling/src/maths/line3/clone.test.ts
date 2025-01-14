import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { clone, create, fromPointAndDirection } from "./index";

test("line3: clone() should return a new line3 with same values", () => {
	const org1 = fromPointAndDirection(create(), [0, 0, 0], [1, 0, 0]);
	const obs1 = clone(org1);
	expect(compareVectors(obs1[0], [0, 0, 0])).toBe(true);
	expect(compareVectors(obs1[1], [1, 0, 0])).toBe(true);
	expect(obs1).never.toBe(org1);

	const org2 = fromPointAndDirection(create(), [1, 2, 3], [1, 0, 1]);
	const obs2 = clone(org2);
	expect(compareVectors(obs2[0], [1, 2, 3])).toBe(true);
	expect(compareVectors(obs2[1], [0.7071067811865475, 0, 0.7071067811865475])).toBe(true);
	expect(obs2).never.toBe(org2);

	const org3 = fromPointAndDirection(create(), [-1, -2, -3], [0, -1, -1]);
	const obs3 = clone(org3);
	expect(compareVectors(obs3[0], [-1, -2, -3])).toBe(true);
	expect(compareVectors(obs3[1], [0, -0.7071067811865475, -0.7071067811865475])).toBe(true);
	expect(obs3).never.toBe(org3);
});
