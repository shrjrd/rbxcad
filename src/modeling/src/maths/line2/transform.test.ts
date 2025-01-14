import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromPoints, transform } from "./index";

test("line2: transform() called with three parameters should update a line2 with correct values", () => {
	const line1 = create();
	const line2 = fromPoints(create(), [0, 0], [0, 1]);
	const line3 = fromPoints(create(), [-3, -3], [3, 3]);

	const identityMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	const obs1 = create();
	let ret1 = transform(obs1, line1, identityMatrix);
	expect(compareVectors(ret1, [0, 1, 0])).toBe(true);
	expect(compareVectors(obs1, [0, 1, 0])).toBe(true);
	ret1 = transform(obs1, line2, identityMatrix);
	expect(compareVectors(ret1, [-1, 0, 0])).toBe(true);
	expect(compareVectors(obs1, [-1, 0, 0])).toBe(true);
	ret1 = transform(obs1, line3, identityMatrix);
	expect(compareVectors(ret1, [-0.7071067811865476, 0.7071067811865476, 0])).toBe(true);
	expect(compareVectors(obs1, [-0.7071067811865476, 0.7071067811865476, 0])).toBe(true);

	const x = 1;
	const y = 5;
	const z = 7;
	const translationMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];

	const obs2 = create();
	let ret2 = transform(obs2, line1, translationMatrix);
	expect(compareVectors(ret2, [0, 1, 5])).toBe(true);
	expect(compareVectors(obs2, [0, 1, 5])).toBe(true);
	ret2 = transform(obs2, line2, translationMatrix);
	expect(compareVectors(ret2, [-1, 0, -1])).toBe(true);
	expect(compareVectors(obs2, [-1, 0, -1])).toBe(true);
	ret2 = transform(obs2, line3, translationMatrix);
	expect(compareVectors(ret2, [-0.7071067811865478, 0.7071067811865474, 2.828427124746189])).toBe(true);
	expect(compareVectors(obs2, [-0.7071067811865478, 0.7071067811865474, 2.828427124746189])).toBe(true);

	const w = 1;
	const h = 3;
	const d = 5;
	const scaleMatrix: Mat4 = [w, 0, 0, 0, 0, h, 0, 0, 0, 0, d, 0, 0, 0, 0, 1];

	const obs3 = create();
	let ret3 = transform(obs3, line1, scaleMatrix);
	expect(compareVectors(ret3, [0, 1, 0])).toBe(true);
	expect(compareVectors(obs3, [0, 1, 0])).toBe(true);
	ret3 = transform(obs3, line2, scaleMatrix);
	expect(compareVectors(ret3, [-1, 0, 0])).toBe(true);
	expect(compareVectors(obs3, [-1, 0, 0])).toBe(true);
	ret3 = transform(obs3, line3, scaleMatrix);
	expect(compareVectors(ret3, [-0.9486832980505139, 0.316227766016838, 0])).toBe(true);
	expect(compareVectors(obs3, [-0.9486832980505139, 0.316227766016838, 0])).toBe(true);

	const r = 90 * 0.017453292519943295;
	const rotateZMatrix: Mat4 = [
		math.cos(r),
		math.sin(r),
		0,
		0,
		-math.sin(r),
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

	const obs4 = create();
	let ret4 = transform(obs4, line1, rotateZMatrix);
	expect(compareVectors(ret4, [-1, 0, 0])).toBe(true);
	expect(compareVectors(obs4, [-1, 0, 0])).toBe(true);
	ret4 = transform(obs4, line2, rotateZMatrix);
	expect(compareVectors(ret4, [0, -1, 0])).toBe(true);
	expect(compareVectors(obs4, [0, -1, 0])).toBe(true);
	ret4 = transform(obs4, line3, rotateZMatrix);
	expect(compareVectors(ret4, [-0.7071067811865476, -0.7071067811865476, -0])).toBe(true);
	expect(compareVectors(obs4, [-0.7071067811865476, -0.7071067811865476, -0])).toBe(true);
});
