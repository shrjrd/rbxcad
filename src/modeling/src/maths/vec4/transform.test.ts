import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { fromValues, transform } from "./index";

test("vec4: transform() called with three parameters should update a vec4 with correct values", () => {
	const identityMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	const out1 = fromValues(0, 0, 0, 0);
	const ret1 = transform(out1, [0, 0, 0, 0], identityMatrix);
	expect(compareVectors(out1, [0, 0, 0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0, 0, 0])).toBe(true);

	const out2 = fromValues(0, 0, 0, 0);
	const ret2 = transform(out2, [3, 2, 1, 0], identityMatrix);
	expect(compareVectors(out2, [3, 2, 1, 0])).toBe(true);
	expect(compareVectors(ret2, [3, 2, 1, 0])).toBe(true);

	const x = 1;
	const y = 5;
	const z = 7;
	const translationMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];

	const out3 = fromValues(0, 0, 0, 0);
	const ret3 = transform(out3, [-1, -2, -3, 1], translationMatrix);
	expect(compareVectors(out3, [0, 3, 4, 1])).toBe(true);
	expect(compareVectors(ret3, [0, 3, 4, 1])).toBe(true);

	const w = 1;
	const h = 3;
	const d = 5;
	const scaleMatrix: Mat4 = [w, 0, 0, 0, 0, h, 0, 0, 0, 0, d, 0, 0, 0, 0, 1];

	const out4 = fromValues(0, 0, 0, 0);
	const ret4 = transform(out4, [1, 2, 3, 1], scaleMatrix);
	expect(compareVectors(out4, [1, 6, 15, 1])).toBe(true);
	expect(compareVectors(ret4, [1, 6, 15, 1])).toBe(true);

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

	const out5 = fromValues(0, 0, 0, 0);
	const ret5 = transform(out5, [1, 2, 3, 1], rotateZMatrix);
	expect(compareVectors(out5, [2, -1, 3, 1])).toBe(true);
	expect(compareVectors(ret5, [2, -1, 3, 1])).toBe(true);
});
