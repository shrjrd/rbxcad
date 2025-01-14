import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { clone, fromValues } from "./index";

test("line2: clone() should return a new line2 with same values", () => {
	const org1 = fromValues(0, 0, 0);
	const obs1 = clone(org1);
	expect(compareVectors(obs1, [0, 0, 0])).toBe(true);
	expect(obs1).never.toBe(org1);

	const org2 = fromValues(1, 2, 3);
	const obs2 = clone(org2);
	expect(compareVectors(obs2, [1, 2, 3])).toBe(true);
	expect(obs2).never.toBe(org2);

	const org3 = fromValues(-1, -2, -3);
	const obs3 = clone(org3);
	expect(compareVectors(obs3, [-1, -2, -3])).toBe(true);
	expect(obs3).never.toBe(org3);
});
