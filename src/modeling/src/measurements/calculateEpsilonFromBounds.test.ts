import { expect, test } from "@rbxts/jest-globals";

import { EPS } from "../maths/constants";
import calculateEpsilonFromBounds from "./calculateEpsilonFromBounds";

test("calculateEpsilonFromBounds: 2 dimension", () => {
	const bounds = [
		[-10, -100],
		[100, 10],
	];
	const calculatedEpsilon = calculateEpsilonFromBounds(bounds as BoundingBox, 2);
	const expectedEpsilon = EPS * 110;
	expect(calculatedEpsilon).toBe(expectedEpsilon);
});

test("calculateEpsilonFromBounds: 3 dimension", () => {
	const bounds: BoundingBox = [
		[-500, 0, -100],
		[0, 500, 100],
	];
	const calculatedEpsilon = calculateEpsilonFromBounds(bounds, 3);
	const expectedEpsilon = EPS * 400;
	expect(calculatedEpsilon).toBe(expectedEpsilon);
});
