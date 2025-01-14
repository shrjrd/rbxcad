import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { fromValues, lerp } from "./index";

test("vec2: lerp() called with three parameters should update a vec2 with correct values", () => {
	const obs1 = fromValues(0, 0);
	const ret1 = lerp(obs1, [0, 0], [0, 0], 0);
	expect(compareVectors(obs1, [0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0])).toBe(true);

	const obs2 = fromValues(0, 0);
	const ret2 = lerp(obs2, [1, 2], [5, 6], 0.0);
	expect(compareVectors(obs2, [1, 2])).toBe(true);
	expect(compareVectors(ret2, [1, 2])).toBe(true);

	const obs3 = fromValues(0, 0);
	const ret3 = lerp(obs3, [1, 2], [5, 6], 0.75);
	expect(compareVectors(obs3, [4, 5])).toBe(true);
	expect(compareVectors(ret3, [4, 5])).toBe(true);

	const obs4 = fromValues(0, 0);
	const ret4 = lerp(obs4, [1, 2], [5, 6], 1.0);
	expect(compareVectors(obs4, [5, 6])).toBe(true);
	expect(compareVectors(ret4, [5, 6])).toBe(true);
});
