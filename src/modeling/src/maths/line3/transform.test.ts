import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromPoints, transform } from "./index";

test("line3: transform() called with three parameters should update a line3 with correct values", () => {
	const line1 = create();
	const line2 = fromPoints(create(), [1, 0, 0], [0, 1, 0]);
	const line3 = fromPoints(create(), [-3, -3, -3], [3, 3, 3]);

	const identityMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	const obs1 = create();
	let ret1 = transform(obs1, line1, identityMatrix);
	expect(compareVectors(ret1[0], [0, 0, 0])).toBe(true);
	expect(compareVectors(ret1[1], [0, 0, 1])).toBe(true);
	expect(compareVectors(obs1[0], [0, 0, 0])).toBe(true);
	expect(compareVectors(obs1[1], [0, 0, 1])).toBe(true);
	expect(line1).never.toBe(obs1);
	expect(ret1).toBe(obs1);
	ret1 = transform(obs1, line2, identityMatrix);
	expect(compareVectors(ret1[0], [1, 0, 0])).toBe(true);
	expect(compareVectors(ret1[1], [-0.7071067811865475, 0.7071067811865475, 0])).toBe(true);
	expect(compareVectors(obs1[0], [1, 0, 0])).toBe(true);
	expect(compareVectors(obs1[1], [-0.7071067811865475, 0.7071067811865475, 0])).toBe(true);
	ret1 = transform(obs1, line3, identityMatrix);
	expect(compareVectors(ret1[0], [-3, -3, -3])).toBe(true);
	expect(compareVectors(ret1[1], [0.5773502691896258, 0.5773502691896258, 0.5773502691896258])).toBe(true);
	expect(compareVectors(obs1[0], [-3, -3, -3])).toBe(true);
	expect(compareVectors(obs1[1], [0.5773502691896258, 0.5773502691896258, 0.5773502691896258])).toBe(true);

	const x = 1;
	const y = 5;
	const z = 7;
	const translationMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];

	// transform in place
	let ret2 = transform(line1, line1, translationMatrix);
	expect(compareVectors(ret2[0], [1, 5, 7])).toBe(true);
	expect(compareVectors(ret2[1], [0, 0, 1])).toBe(true);
	expect(compareVectors(line1[0], [1, 5, 7])).toBe(true);
	expect(compareVectors(line1[1], [0, 0, 1])).toBe(true);
	expect(ret2).toBe(line1);
	ret2 = transform(line2, line2, translationMatrix);
	expect(compareVectors(ret2[0], [2, 5, 7])).toBe(true);
	expect(compareVectors(ret2[1], [-0.7071067811865474, 0.7071067811865478, 0])).toBe(true);
	expect(compareVectors(line2[0], [2, 5, 7])).toBe(true);
	expect(compareVectors(line2[1], [-0.7071067811865474, 0.7071067811865478, 0])).toBe(true);
	expect(ret2).toBe(line2);
	ret2 = transform(line3, line3, translationMatrix);
	expect(compareVectors(ret2[0], [-2, 2, 4])).toBe(true);
	expect(compareVectors(ret2[1], [0.5773502691896256, 0.5773502691896256, 0.5773502691896261])).toBe(true);
	expect(compareVectors(line3[0], [-2, 2, 4])).toBe(true);
	expect(compareVectors(line3[1], [0.5773502691896256, 0.5773502691896256, 0.5773502691896261])).toBe(true);
	expect(ret2).toBe(line3);
});
