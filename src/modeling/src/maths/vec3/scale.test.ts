import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { fromValues, scale } from "./index";

test("vec3: scale() called with three parameters should update a vec3 with correct values", () => {
	const obs1 = fromValues(0, 0, 0);
	const ret1 = scale(obs1, [0, 0, 0], 0);
	expect(compareVectors(obs1, [0, 0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0, 0])).toBe(true);

	const obs2 = fromValues(0, 0, 0);
	const ret2 = scale(obs2, [1, 2, 3], 0);
	expect(compareVectors(obs2, [0, 0, 0])).toBe(true);
	expect(compareVectors(ret2, [0, 0, 0])).toBe(true);

	const obs3 = fromValues(0, 0, 0);
	const ret3 = scale(obs3, [1, 2, 3], 6);
	expect(compareVectors(obs3, [6, 12, 18])).toBe(true);
	expect(compareVectors(ret3, [6, 12, 18])).toBe(true);

	const obs4 = fromValues(0, 0, 0);
	const ret4 = scale(obs4, [1, 2, 3], -6);
	expect(compareVectors(obs4, [-6, -12, -18])).toBe(true);
	expect(compareVectors(ret4, [-6, -12, -18])).toBe(true);

	const obs5 = fromValues(0, 0, 0);
	const ret5 = scale(obs5, [-1, -2, -3], 6);
	expect(compareVectors(obs5, [-6, -12, -18])).toBe(true);
	expect(compareVectors(ret5, [-6, -12, -18])).toBe(true);

	const obs6 = fromValues(0, 0, 0);
	const ret6 = scale(obs6, [-1, -2, -3], -6);
	expect(compareVectors(obs6, [6, 12, 18])).toBe(true);
	expect(compareVectors(ret6, [6, 12, 18])).toBe(true);
});
