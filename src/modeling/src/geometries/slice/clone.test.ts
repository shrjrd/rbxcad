import { expect, test } from "@rbxts/jest-globals";

import { clone, create, fromVertices, toVertices } from "./index";

test("slice: clone() should return a new slice with same values", () => {
	const org1 = create();
	const ret1 = clone(org1);
	expect(ret1).never.toBe(org1);

	const org2 = fromVertices([
		[1, 1],
		[-1, 1],
		[-1, -1],
		[1, -1],
	]);
	const ret2 = clone(org2);
	expect(ret2).never.toBe(org2);
	expect(toVertices(ret2)).toEqual(toVertices(org2));
});
