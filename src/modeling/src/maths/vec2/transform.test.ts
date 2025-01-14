import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { fromValues, transform } from "./index";

test("vec2: transform() called with three parameters should update a vec2 with correct values", () => {
	const identityMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	const obs1 = fromValues(0, 0);
	const ret1 = transform(obs1, [0, 0], identityMatrix);
	expect(compareVectors(obs1, [0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0])).toBe(true);

	const obs2 = fromValues(0, 0);
	const ret2 = transform(obs2, [3, 2], identityMatrix);
	expect(compareVectors(obs2, [3, 2])).toBe(true);
	expect(compareVectors(ret2, [3, 2])).toBe(true);

	const x = 1;
	const y = 5;
	const z = 7;
	const translationMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];

	const obs3 = fromValues(0, 0);
	const ret3 = transform(obs3, [-1, -2], translationMatrix);
	expect(compareVectors(obs3, [0, 3])).toBe(true);
	expect(compareVectors(ret3, [0, 3])).toBe(true);

	const w = 1;
	const h = 3;
	const d = 5;
	const scaleMatrix: Mat4 = [w, 0, 0, 0, 0, h, 0, 0, 0, 0, d, 0, 0, 0, 0, 1];

	const obs4 = fromValues(0, 0);
	const ret4 = transform(obs4, [1, 2], scaleMatrix);
	expect(compareVectors(obs4, [1, 6])).toBe(true);
	expect(compareVectors(ret4, [1, 6])).toBe(true);

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

	const obs5 = fromValues(0, 0);
	const ret5 = transform(obs5, [1, 2], rotateZMatrix);
	expect(compareVectors(obs5, [2, -1])).toBe(true);
	expect(compareVectors(ret5, [2, -1])).toBe(true);
});
