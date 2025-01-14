import { expect, test } from "@rbxts/jest-globals";

import { comparePolygons } from "../../../test/helpers/index";
import { clone, create, fromPoints } from "./index";

test("poly3: clone() should return a new poly3 with same values", () => {
	const org1 = create();
	const ret1 = clone(org1);
	expect(comparePolygons(ret1, org1)).toBe(true);
	expect(ret1).never.toBe(org1);

	const org2 = fromPoints([
		[1, 1, 0],
		[-1, 1, 0],
		[-1, -1, 0],
		[1, -1, 0],
	]);
	const ret2 = clone(org2);
	expect(comparePolygons(ret2, org2)).toBe(true);
	expect(ret2).never.toBe(org2);
});

test("poly3: clone() with two params should update a poly3 with same values", () => {
	const org1 = create();
	const out1 = create();
	const ret1 = clone(out1, org1);
	expect(comparePolygons(org1, out1)).toBe(true);
	expect(comparePolygons(org1, ret1)).toBe(true);
	expect(out1).never.toBe(org1);
	expect(ret1).never.toBe(org1);
	expect(ret1).toBe(out1);

	const org2 = fromPoints([
		[1, 1, 0],
		[-1, 1, 0],
		[-1, -1, 0],
		[1, -1, 0],
	]);
	const out2 = create();
	const ret2 = clone(out2, org2);
	expect(comparePolygons(ret2, org2)).toBe(true);
	expect(out2).never.toBe(org2);
	expect(ret2).never.toBe(org2);
	expect(ret2).toBe(out2);
});
