import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../../test/helpers/index";
import { clone, create } from "./index";

test("poly2: clone() should return a new poly2 with same values", () => {
	const org1 = create();
	const ret1 = clone(org1);
	expect(comparePoints(ret1.points, org1.points)).toBe(true);
	expect(ret1).never.toBe(org1);

	const org2 = create([
		[1, 1],
		[-1, 1],
		[-1, -1],
		[1, -1],
	]);
	const ret2 = clone(org2);
	expect(comparePoints(ret2.points, org2.points)).toBe(true);
	expect(ret2).never.toBe(org2);
});
