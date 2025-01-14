import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { fromValues, subtract } from "./index";

test("vec2: subtract() called with three parameters should update a vec2 with correct values", () => {
	const obs1 = fromValues(0, 0);
	const ret1 = subtract(obs1, [0, 0], [0, 0]);
	expect(compareVectors(obs1, [0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0])).toBe(true);

	const obs2 = fromValues(0, 0);
	const ret2 = subtract(obs2, [1, 2], [3, 2]);
	expect(compareVectors(obs2, [-2, 0])).toBe(true);
	expect(compareVectors(ret2, [-2, 0])).toBe(true);

	const obs3 = fromValues(0, 0);
	const ret3 = subtract(obs3, [1, 2], [-1, -2]);
	expect(compareVectors(obs3, [2, 4])).toBe(true);
	expect(compareVectors(ret3, [2, 4])).toBe(true);

	const obs4 = fromValues(0, 0);
	const ret4 = subtract(obs4, [-1, -2], [-1, -2]);
	expect(compareVectors(obs4, [0, 0])).toBe(true);
	expect(compareVectors(ret4, [0, 0])).toBe(true);
});
