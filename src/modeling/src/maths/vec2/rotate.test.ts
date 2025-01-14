import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { TAU } from "../constants";
import { fromValues, rotate } from "./index";

test("vec2: rotate() called with three parameters should update a vec2 with correct values", () => {
	const radians = TAU / 4;

	const obs1 = fromValues(0, 0);
	const ret1 = rotate(obs1, [0, 0], [0, 0], 0);
	expect(compareVectors(obs1, [0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0])).toBe(true);

	const obs2 = fromValues(0, 0);
	const ret2 = rotate(obs2, [1, 2], [0, 0], 0);
	expect(compareVectors(obs2, [1, 2])).toBe(true);
	expect(compareVectors(ret2, [1, 2])).toBe(true);

	const obs3 = fromValues(0, 0);
	const ret3 = rotate(obs3, [-1, -2], [0, 0], radians);
	expect(compareVectors(obs3, [2, -1], 1e-15)).toBe(true);
	expect(compareVectors(ret3, [2, -1], 1e-15)).toBe(true);

	const obs4 = fromValues(0, 0);
	const ret4 = rotate(obs4, [-1, 2], [-3, -3], -radians);
	expect(compareVectors(obs4, [2, -5], 1e-15)).toBe(true);
	expect(compareVectors(ret4, [2, -5], 1e-15)).toBe(true);
});
