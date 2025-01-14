import { expect, test } from "@rbxts/jest-globals";

import { nearlyEqual } from "../../../test/helpers/index";
import { EPS } from "../constants";
import { angleRadians } from "./index";

test("vec2: angleRadians() should return correct values", () => {
	const distance1 = angleRadians([0, 0]);
	nearlyEqual(distance1, 0.0, EPS);

	const distance2 = angleRadians([1, 2]);
	nearlyEqual(distance2, 1.1071487177940904, EPS);

	const distance3 = angleRadians([1, -2]);
	nearlyEqual(distance3, -1.1071487177940904, EPS);

	const distance4 = angleRadians([-1, -2]);
	nearlyEqual(distance4, -2.0344439357957027, EPS);

	const distance5 = angleRadians([-1, 2]);
	nearlyEqual(distance5, 2.0344439357957027, EPS);

	expect(true).toBe(true);
});
