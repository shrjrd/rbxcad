import type { Mat4 } from "../../maths/types";
import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../../test/helpers/index";
import { create, transform } from "./index";

test("poly2: transform() should return a new poly2 with correct values", () => {
	const identityMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	const exp1 = {
		points: [
			[0, 0],
			[1, 0],
			[1, 1],
		],
	};
	const org1 = create([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	const ret1 = transform(identityMatrix, org1);
	expect(comparePoints(ret1.points, exp1.points)).toBe(true);
	expect(org1).never.toBe(ret1);

	const x = 1;
	const y = 5;
	const z = 0;
	const translationMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];

	const exp2 = {
		points: [
			[1, 5],
			[2, 5],
			[2, 6],
		],
	};
	const org2 = create([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	const ret2 = transform(translationMatrix, org2);
	expect(comparePoints(ret2.points, exp2.points)).toBe(true);
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

	const exp3 = {
		points: [
			[0, 0],
			[0, -1],
			[1, -1],
		],
	};
	const org3 = create([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	const ret3 = transform(rotateZMatrix, org3);
	expect(comparePoints(ret3.points, exp3.points)).toBe(true);
	expect(org3).never.toBe(ret3);

	const mirrorMatrix: Mat4 = [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	const exp4 = {
		points: [
			[-1, 1],
			[-1, 0],
			[0, 0],
		],
	};
	const org4 = create([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	const ret4 = transform(mirrorMatrix, org4);
	expect(comparePoints(ret4.points, exp4.points)).toBe(true);
	expect(org4).never.toBe(ret4);
});
