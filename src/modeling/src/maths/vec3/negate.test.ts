import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { fromValues, negate } from "./index";

test("vec3: negate() called with two parameters should update a vec3 with correct values", () => {
	const obs1 = fromValues(0, 0, 0);
	const ret1 = negate(obs1, [0, 0, 0]);
	expect(compareVectors(obs1, [-0, -0, -0])).toBe(true);
	expect(compareVectors(ret1, [-0, -0, -0])).toBe(true);

	const obs2 = fromValues(0, 0, 0);
	const ret2 = negate(obs2, [1, 2, 3]);
	expect(compareVectors(obs2, [-1, -2, -3])).toBe(true);
	expect(compareVectors(ret2, [-1, -2, -3])).toBe(true);

	const obs3 = fromValues(0, 0, 0);
	const ret3 = negate(obs3, [-1, -2, -3]);
	expect(compareVectors(obs3, [1, 2, 3])).toBe(true);
	expect(compareVectors(ret3, [1, 2, 3])).toBe(true);

	const obs4 = fromValues(0, 0, 0);
	const ret4 = negate(obs4, [-1, 2, -3]);
	expect(compareVectors(obs4, [1, -2, 3])).toBe(true);
	expect(compareVectors(ret4, [1, -2, 3])).toBe(true);
});
