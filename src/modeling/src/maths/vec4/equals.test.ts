import { expect, test } from "@rbxts/jest-globals";

import { equals, fromValues } from "./index";

test("vec4: equals() should return correct booleans", () => {
	const vec0 = fromValues(0, 0, 0, 0);
	const vec1 = fromValues(0, 0, 0, 0);
	expect(equals(vec0, vec1)).toBe(true);

	const vec2 = fromValues(1, 1, 1, 1);
	expect(equals(vec0, vec2)).toBe(false);

	const vec3 = fromValues(0, 1, 1, 0);
	expect(equals(vec0, vec3)).toBe(false);

	const vec4 = fromValues(0, 0, 1, 1);
	expect(equals(vec0, vec4)).toBe(false);
});
