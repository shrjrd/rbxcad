import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { fromValues, min } from "./index";

test("vec2: min() called with three parameters should update a vec2 with correct values", () => {
	const obs1 = fromValues(0, 0);
	const vec0 = fromValues(0, 0);
	const vec1 = fromValues(0, 0);
	const ret1 = min(obs1, vec0, vec1);
	expect(compareVectors(obs1, [0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0])).toBe(true);

	const obs2 = fromValues(0, 0);
	const vec2 = fromValues(1, 1);
	const ret2 = min(obs2, vec0, vec2);
	expect(compareVectors(obs2, [0, 0])).toBe(true);
	expect(compareVectors(ret2, [0, 0])).toBe(true);

	const obs3 = fromValues(0, 0);
	const vec3 = fromValues(0, 1);
	const ret3 = min(obs3, vec0, vec3);
	expect(compareVectors(obs3, [0, 0])).toBe(true);
	expect(compareVectors(ret3, [0, 0])).toBe(true);

	const obs4 = fromValues(0, 0);
	const vec4 = fromValues(0, 0);
	const ret4 = min(obs4, vec0, vec4);
	expect(compareVectors(obs4, [0, 0])).toBe(true);
	expect(compareVectors(ret4, [0, 0])).toBe(true);
});
