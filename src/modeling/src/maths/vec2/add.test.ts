import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { add, fromValues } from "./index";

test("vec2: add() called with three parameters should update a vec2 with correct values", () => {
	const obs1 = fromValues(0, 0);
	const ret1 = add(obs1, [0, 0], [0, 0]);
	expect(compareVectors(obs1, [0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0])).toBe(true);

	const obs2 = fromValues(0, 0);
	const ret2 = add(obs2, [1, 2], [3, 2]);
	expect(compareVectors(obs2, [4, 4])).toBe(true);
	expect(compareVectors(ret2, [4, 4])).toBe(true);

	const obs3 = fromValues(0, 0);
	const ret3 = add(obs3, [1, 2], [-1, -2]);
	expect(compareVectors(obs3, [0, 0])).toBe(true);
	expect(compareVectors(ret3, [0, 0])).toBe(true);

	const obs4 = fromValues(0, 0);
	const ret4 = add(obs4, [-1, -2], [-1, -2]);
	expect(compareVectors(obs4, [-2, -4])).toBe(true);
	expect(compareVectors(ret4, [-2, -4])).toBe(true);
});
