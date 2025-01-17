import { expect, test } from "@rbxts/jest-globals";

import { fromPoints, toEdges, transform } from "./index";

test("slice: transform() should return a new slice with correct values", () => {
	const identityMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	const org1 = fromPoints([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	const ret1 = transform(identityMatrix, org1);
	expect(org1).never.toBe(ret1);

	const edges1 = toEdges(ret1);
	const exp1 = [
		[
			[1, 1, 0],
			[0, 0, 0],
		],
		[
			[0, 0, 0],
			[1, 0, 0],
		],
		[
			[1, 0, 0],
			[1, 1, 0],
		],
	];
	expect(edges1).toEqual(exp1);

	const x = 1;
	const y = 5;
	const z = 7;
	const translationMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];

	const org2 = fromPoints([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	const ret2 = transform(translationMatrix, org2);
	expect(org2).never.toBe(ret2);

	const edges2 = toEdges(ret2);
	const exp2 = [
		[
			[2, 6, 7],
			[1, 5, 7],
		],
		[
			[1, 5, 7],
			[2, 5, 7],
		],
		[
			[2, 5, 7],
			[2, 6, 7],
		],
	];
	expect(edges2).toEqual(exp2);

	const r = 90 * 0.017453292519943295;
	const rotateZMatrix: Mat4 = [
		math.cos(r),
		-math.sin(r),
		0,
		0,
		math.sin(r),
		math.cos(r),
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
	];

	const org3 = fromPoints([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	const ret3 = transform(rotateZMatrix, org3);
	expect(org3).never.toBe(ret3);

	const edges3 = toEdges(ret3);
	const exp3 = [
		[
			[1, -0.9999999999999999, 0],
			[0, 0, 0],
		],
		[
			[0, 0, 0],
			[6.123233995736766e-17, -1, 0],
		],
		[
			[6.123233995736766e-17, -1, 0],
			[1, -0.9999999999999999, 0],
		],
	];
	expect(edges3).toEqual(exp3);
});
