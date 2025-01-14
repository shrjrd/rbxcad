import { expect, test } from "@rbxts/jest-globals";

import { dot, fromValues } from "./index";

test("vec4: dot() should return proper values", () => {
	const vecA = fromValues(1, 2, 3, 4);
	const vecB = fromValues(5, 6, 7, 8);

	const obs = dot(vecA, vecB);
	expect(obs).toBe(70);
});
