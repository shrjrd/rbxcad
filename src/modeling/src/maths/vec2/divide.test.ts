import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { divide, fromValues } from "./index";

test("vec2: divide() called with three parameters should update a vec2 with correct values", () => {
	const obs1 = fromValues(0, 0);
	const ret1 = divide(obs1, [0, 0], [0, 0]);
	expect(compareVectors(obs1, [0 / 0, 0 / 0])).toBe(true);
	expect(compareVectors(ret1, [0 / 0, 0 / 0])).toBe(true);

	const obs2 = fromValues(0, 0);
	const ret2 = divide(obs2, [0, 0], [1, 2]);
	expect(compareVectors(obs2, [0, 0])).toBe(true);
	expect(compareVectors(ret2, [0, 0])).toBe(true);

	const obs3 = fromValues(0, 0);
	const ret3 = divide(obs3, [6, 6], [1, 2]);
	expect(compareVectors(obs3, [6, 3])).toBe(true);
	expect(compareVectors(ret3, [6, 3])).toBe(true);

	const obs4 = fromValues(0, 0);
	const ret4 = divide(obs4, [-6, -6], [1, 2]);
	expect(compareVectors(obs4, [-6, -3])).toBe(true);
	expect(compareVectors(ret4, [-6, -3])).toBe(true);

	const obs5 = fromValues(0, 0);
	const ret5 = divide(obs5, [6, 6], [-1, -2]);
	expect(compareVectors(obs5, [-6, -3])).toBe(true);
	expect(compareVectors(ret5, [-6, -3])).toBe(true);

	const obs6 = fromValues(0, 0);
	const ret6 = divide(obs6, [-6, -6], [-1, -2]);
	expect(compareVectors(obs6, [6, 3])).toBe(true);
	expect(compareVectors(ret6, [6, 3])).toBe(true);
});
