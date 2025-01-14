import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../test/helpers/";
import { create, fromPointAxisNormal, transform } from "./index";

test("connector: transform() should return a connector with correct values", () => {
	const connector1 = create();
	const connector2 = fromPointAxisNormal([1, 0, 0], [0, 1, 0], [0, 0, 1]);
	const connector3 = fromPointAxisNormal([-3, -3, -3], [3, 3, 3], [3, -3, 3]);

	const identityMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

	let obs1 = transform(identityMatrix, connector1);
	expect(compareVectors(obs1.point, [0, 0, 0])).toBe(true);
	expect(compareVectors(obs1.axis, [0, 0, 1])).toBe(true);
	expect(compareVectors(obs1.normal, [1, 0, 0])).toBe(true);

	obs1 = transform(identityMatrix, connector2);
	expect(compareVectors(obs1.point, [1, 0, 0])).toBe(true);
	expect(compareVectors(obs1.axis, [0, 1, 0])).toBe(true);
	expect(compareVectors(obs1.normal, [0, 0, 1])).toBe(true);

	obs1 = transform(identityMatrix, connector3);
	expect(compareVectors(obs1.point, [-3, -3, -3])).toBe(true);
	expect(compareVectors(obs1.axis, [0.5773502691896258, 0.5773502691896258, 0.5773502691896258])).toBe(true);
	expect(compareVectors(obs1.normal, [0.5773502691896258, -0.5773502691896258, 0.5773502691896258])).toBe(true);

	const x = 1;
	const y = 5;
	const z = 7;
	const translationMatrix: Mat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];

	let obs2 = transform(translationMatrix, connector1);
	expect(compareVectors(obs2.point, [1, 5, 7])).toBe(true);
	expect(compareVectors(obs2.axis, [0, 0, 1])).toBe(true);
	expect(compareVectors(obs2.normal, [1, 0, 0])).toBe(true);

	obs2 = transform(translationMatrix, connector2);
	expect(compareVectors(obs2.point, [2, 5, 7])).toBe(true);
	expect(compareVectors(obs2.axis, [0, 1, 0])).toBe(true);
	expect(compareVectors(obs2.normal, [0, 0, 1])).toBe(true);

	obs2 = transform(translationMatrix, connector3);
	expect(compareVectors(obs2.point, [-2, 2, 4])).toBe(true);
	expect(compareVectors(obs2.axis, [0.5773502691896256, 0.5773502691896256, 0.5773502691896261])).toBe(true);
	expect(compareVectors(obs2.normal, [0.5773502691896256, -0.5773502691896256, 0.5773502691896261])).toBe(true);

	const w = 1;
	const h = 3;
	const d = 5;
	const scaleMatrix: Mat4 = [w, 0, 0, 0, 0, h, 0, 0, 0, 0, d, 0, 0, 0, 0, 1];

	let obs3 = transform(scaleMatrix, connector1);
	expect(compareVectors(obs3.point, [0, 0, 0])).toBe(true);
	expect(compareVectors(obs3.axis, [0, 0, 1])).toBe(true);
	expect(compareVectors(obs3.normal, [1, 0, 0])).toBe(true);

	obs3 = transform(scaleMatrix, connector2);
	expect(compareVectors(obs3.point, [1, 0, 0])).toBe(true);
	expect(compareVectors(obs3.axis, [0, 1, 0])).toBe(true);
	expect(compareVectors(obs3.normal, [0, 0, 1])).toBe(true);

	obs3 = transform(scaleMatrix, connector3);
	expect(compareVectors(obs3.point, [-3, -9, -15])).toBe(true);
	expect(compareVectors(obs3.axis, [0.1690308509457033, 0.5070925528371097, 0.8451542547285166])).toBe(true);
	expect(compareVectors(obs3.normal, [0.1690308509457033, -0.5070925528371097, 0.8451542547285166])).toBe(true);

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

	let obs4 = transform(rotateZMatrix, connector1);
	expect(compareVectors(obs4.point, [0, 0, 0])).toBe(true);
	expect(compareVectors(obs4.axis, [0, 0, 1])).toBe(true);
	expect(compareVectors(obs4.normal, [6.123234262925839e-17, 1, 0])).toBe(true);

	obs4 = transform(rotateZMatrix, connector2);
	expect(compareVectors(obs4.point, [0, 1, 0])).toBe(true);
	expect(compareVectors(obs4.axis, [-1, 0, 0])).toBe(true);
	expect(compareVectors(obs4.normal, [0, 0, 1])).toBe(true);

	obs4 = transform(rotateZMatrix, connector3);
	expect(compareVectors(obs4.point, [3, -3, -3])).toBe(true);
	expect(compareVectors(obs4.axis, [-0.5773502691896258, 0.5773502691896258, 0.5773502691896258])).toBe(true);
	expect(compareVectors(obs4.normal, [0.5773502691896258, 0.5773502691896258, 0.5773502691896258])).toBe(true);
});
