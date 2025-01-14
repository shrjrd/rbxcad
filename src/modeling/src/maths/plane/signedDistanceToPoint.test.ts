import { expect, test } from "@rbxts/jest-globals";

import { fromValues, signedDistanceToPoint } from "./index";

test("plane: signedDistanceToPoint() should return correct values", () => {
	const plane1 = fromValues(0, 0, 0, 0);
	const distance1 = signedDistanceToPoint(plane1, [0, 0, 0]);
	expect(distance1 === 0.0).toBe(true);

	const plane2 = fromValues(1, 1, 1, 1);
	const distance2 = signedDistanceToPoint(plane2, [-1, -1, -1]);
	expect(distance2 === -3.0 - 1).toBe(true);

	const plane3 = fromValues(5, 5, 5, 5);
	const distance3 = signedDistanceToPoint(plane3, [5, 5, 5]);
	expect(distance3 === 75.0 - 5).toBe(true);

	const plane4 = fromValues(5, 5, 5, 5);
	const distance4 = signedDistanceToPoint(plane4, [-2, 3, -4]);
	expect(distance4 === -15.0 - 5).toBe(true);
});
