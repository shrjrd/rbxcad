import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { abs, create } from "./index";

test("vec2: abs() with two params should update a vec2 with correct values", () => {
	const vec1 = create();
	const ret1 = abs(vec1, [0, 0]);
	expect(compareVectors(vec1, [0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0])).toBe(true);
	expect(vec1).toBe(ret1);

	const vec2 = create();
	const ret2 = abs(vec2, [1, 2]);
	expect(compareVectors(vec2, [1, 2])).toBe(true);
	expect(compareVectors(ret2, [1, 2])).toBe(true);
	expect(vec2).toBe(ret2);

	const vec3 = create();
	const ret3 = abs(vec3, [-1, -2]);
	expect(compareVectors(vec3, [1, 2])).toBe(true);
	expect(compareVectors(ret3, [1, 2])).toBe(true);
	expect(vec3).toBe(ret3);
});
