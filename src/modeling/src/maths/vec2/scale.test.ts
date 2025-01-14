import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, scale } from "./index";

test("vec2: scale() with two params should update a vec2 with positive values", () => {
	const vec1 = create();
	const ret1 = scale(vec1, [0, 0], 0);
	expect(compareVectors(vec1, [0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0])).toBe(true);
	expect(vec1).toBe(ret1);

	const vec2 = create();
	const ret2 = scale(vec2, [1, 2], 3);
	expect(compareVectors(vec2, [3, 6])).toBe(true);
	expect(compareVectors(ret2, [3, 6])).toBe(true);
	expect(vec2).toBe(ret2);

	const vec3 = create();
	const ret3 = scale(vec3, [-1, -2], 3);
	expect(compareVectors(vec3, [-3, -6])).toBe(true);
	expect(compareVectors(ret3, [-3, -6])).toBe(true);
	expect(vec3).toBe(ret3);
});
