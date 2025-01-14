import { expect, test } from "@rbxts/jest-globals";

import { dot, fromValues } from "./index";

test("vec3: dot() should return correct values", () => {
	const veca1 = fromValues(0, 0, 0);
	const vecb1 = fromValues(0, 0, 0);
	const dot1 = dot(veca1, vecb1);
	expect(dot1 === 0.0).toBe(true);

	const veca2 = fromValues(1, 1, 1);
	const vecb2 = fromValues(-1, -1, -1);
	const dot2 = dot(veca2, vecb2);
	expect(dot2 === -3.0).toBe(true);

	const veca3 = fromValues(5, 5, 5);
	const vecb3 = fromValues(5, 5, 5);
	const dot3 = dot(veca3, vecb3);
	expect(dot3 === 75.0).toBe(true);

	const veca4 = fromValues(5, 5, 5);
	const vecb4 = fromValues(-2, 3, -4);
	const dot4 = dot(veca4, vecb4);
	expect(dot4 === -15.0).toBe(true);
});
