import { expect, test } from "@rbxts/jest-globals";

import { comparePolygons } from "../../../test/helpers/index";
import { fromPoints, transform } from "./index";

test("poly3: transform() should return a new poly3 with correct values", () => {
	const identityMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	const exp1: Poly3 = {
		vertices: [
			[0, 0, 0],
			[1, 0, 0],
			[1, 1, 0],
		],
	};
	const org1 = fromPoints([
		[0, 0, 0],
		[1, 0, 0],
		[1, 1, 0],
	]);
	const ret1 = transform(identityMatrix, org1);
	expect(comparePolygons(ret1, exp1)).toBe(true);
	expect(org1).never.toBe(ret1);

	const x = 1;
	const y = 5;
	const z = 7;
	const translationMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];

	const exp2: Poly3 = {
		vertices: [
			[1, 5, 7],
			[2, 5, 7],
			[2, 6, 7],
		],
	};
	const org2 = fromPoints([
		[0, 0, 0],
		[1, 0, 0],
		[1, 1, 0],
	]);
	const ret2 = transform(translationMatrix, org2);
	expect(comparePolygons(ret2, exp2)).toBe(true);
	expect(org2).never.toBe(ret2);

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

	const exp3: Poly3 = {
		vertices: [
			[0, 0, 0],
			[0, -1, 0],
			[1, -1, 0],
		],
	};
	const org3 = fromPoints([
		[0, 0, 0],
		[1, 0, 0],
		[1, 1, 0],
	]);
	const ret3 = transform(rotateZMatrix, org3);
	expect(comparePolygons(ret3, exp3)).toBe(true);
	expect(org3).never.toBe(ret3);

	const mirrorMatrix: Mat4 = [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	const exp4: Poly3 = {
		vertices: [
			[-1, 1, 0],
			[-1, 0, 0],
			[0, 0, 0],
		],
	};
	const org4 = fromPoints([
		[0, 0, 0],
		[1, 0, 0],
		[1, 1, 0],
	]);
	const ret4 = transform(mirrorMatrix, org4);
	expect(comparePolygons(ret4, exp4)).toBe(true);
	expect(org4).never.toBe(ret4);
});
