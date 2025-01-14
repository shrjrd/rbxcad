import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { TAU } from "../constants";
import { fromValues, rotateZ } from "./index";

test("vec3: rotateZ() called with four parameters should update a vec3 with correct values", () => {
	const radians = TAU / 4;

	const obs1 = fromValues(0, 0, 0);
	const ret1 = rotateZ(obs1, [0, 0, 0], [0, 0, 0], 0);
	expect(compareVectors(obs1, [0, 0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0, 0])).toBe(true);

	const obs2 = fromValues(0, 0, 0);
	const ret2 = rotateZ(obs2, [3, 2, 1], [1, 2, 3], 0);
	expect(compareVectors(obs2, [3, 2, 1])).toBe(true);
	expect(compareVectors(ret2, [3, 2, 1])).toBe(true);

	const obs3 = fromValues(0, 0, 0);
	const ret3 = rotateZ(obs3, [-1, -2, -3], [1, 2, 3], radians);
	expect(compareVectors(obs3, [5, -0, -3])).toBe(true);
	expect(compareVectors(ret3, [5, -0, -3])).toBe(true);

	const obs4 = fromValues(0, 0, 0);
	const ret4 = rotateZ(obs4, [1, 2, 3], [-1, -2, -3], -radians);
	expect(compareVectors(obs4, [3, -4, 3])).toBe(true);
	expect(compareVectors(ret4, [3, -4, 3])).toBe(true);
});
