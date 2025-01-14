import { expect, test } from "@rbxts/jest-globals";

import { clone, create, fromPoints, toEdges } from "./index";

test("slice: clone() should return a new slice with same values", () => {
	const org1 = create();
	const ret1 = clone(org1);
	expect(ret1).never.toBe(org1);

	const org2 = fromPoints([
		[1, 1],
		[-1, 1],
		[-1, -1],
		[1, -1],
	]);
	const ret2 = clone(org2);
	expect(ret2).never.toBe(org2);
	expect(toEdges(ret2)).toEqual(toEdges(org2));
});

test("slice: clone() with two params should update a slice with same values", () => {
	const org1 = create();
	const out1 = create();
	const ret1 = clone(out1, org1);
	expect(out1).never.toBe(org1);
	expect(ret1).never.toBe(org1);
	expect(ret1).toBe(out1);

	expect(toEdges(ret1)).toEqual(toEdges(org1));

	const org2 = fromPoints([
		[1, 1],
		[-1, 1],
		[-1, -1],
		[1, -1],
	]);
	const out2 = create();
	const ret2 = clone(out2, org2);
	expect(out2).never.toBe(org2);
	expect(ret2).never.toBe(org2);
	expect(ret2).toBe(out2);

	expect(toEdges(ret2)).toEqual(toEdges(org2));
});
