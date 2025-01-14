import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { clone, fromValues } from "./index";

test("vec4: clone() with one param should create a new vec4 with same values", () => {
	const vec1 = fromValues(0, 0, 0, 0);
	const ret1 = clone(vec1);
	expect(ret1).never.toBe(vec1);
	expect(compareVectors(vec1, [0, 0, 0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0, 0, 0])).toBe(true);

	const vec2 = fromValues(1, 2, 3, 4);
	const ret2 = clone(vec2);
	expect(ret2).never.toBe(vec2);
	expect(compareVectors(vec2, [1, 2, 3, 4])).toBe(true);
	expect(compareVectors(ret2, [1, 2, 3, 4])).toBe(true);

	const vec3 = fromValues(-1, -2, -3, -4);
	const ret3 = clone(vec3);
	expect(ret3).never.toBe(vec3);
	expect(compareVectors(vec3, [-1, -2, -3, -4])).toBe(true);
	expect(compareVectors(ret3, [-1, -2, -3, -4])).toBe(true);
});
