import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { TAU } from "../constants";
import { fromValues, rotateY } from "./index";

test("vec3: rotateY() called with three parameters should update a vec3 with correct values", () => {
	const radians = TAU / 4;

	const obs1 = fromValues(0, 0, 0);
	const ret1 = rotateY(obs1, [0, 0, 0], [0, 0, 0], 0);
	expect(compareVectors(obs1, [0, 0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0, 0])).toBe(true);

	const obs2 = fromValues(0, 0, 0);
	const ret2 = rotateY(obs2, [3, 2, 1], [1, 2, 3], 0);
	expect(compareVectors(obs2, [3, 2, 1])).toBe(true);
	expect(compareVectors(ret2, [3, 2, 1])).toBe(true);

	const obs3 = fromValues(0, 0, 0);
	const ret3 = rotateY(obs3, [-1, -2, -3], [1, 2, 3], radians);
	expect(compareVectors(obs3, [-5, -2, 5])).toBe(true);
	expect(compareVectors(ret3, [-5, -2, 5])).toBe(true);

	const obs4 = fromValues(0, 0, 0);
	const ret4 = rotateY(obs4, [1, 2, 3], [-1, -2, -3], -radians);
	expect(compareVectors(obs4, [-7, 2, -1], 1e-15)).toBe(true);
	expect(compareVectors(ret4, [-7, 2, -1], 1e-15)).toBe(true);
});
