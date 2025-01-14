import { expect, test } from "@rbxts/jest-globals";

import { nearlyEqual } from "../../../test/helpers/index";
import { EPS } from "../constants";
import { fromValues, squaredLength } from "./index";

test("vec3: length() should return correct values", () => {
	const vec1 = fromValues(0, 0, 0);
	const length1 = squaredLength(vec1);
	nearlyEqual(length1, 0.0, EPS);

	const vec2 = fromValues(1, 2, 3);
	const length2 = squaredLength(vec2);
	nearlyEqual(length2, 14.0, EPS);

	const vec3 = fromValues(1, -2, 3);
	const length3 = squaredLength(vec3);
	nearlyEqual(length3, 14.0, EPS);

	const vec4 = fromValues(-1, -2, 3);
	const length4 = squaredLength(vec4);
	nearlyEqual(length4, 14.0, EPS);

	const vec5 = fromValues(-1, 2, 3);
	const length5 = squaredLength(vec5);
	nearlyEqual(length5, 14.0, EPS);

	const vec6 = fromValues(1, 2, -3);
	const length6 = squaredLength(vec6);
	nearlyEqual(length6, 14.0, EPS);

	const vec7 = fromValues(1, -2, -3);
	const length7 = squaredLength(vec7);
	nearlyEqual(length7, 14.0, EPS);

	const vec8 = fromValues(-1, -2, -3);
	const length8 = squaredLength(vec8);
	nearlyEqual(length8, 14.0, EPS);

	const vec9 = fromValues(-1, 2, -3);
	const length9 = squaredLength(vec9);
	nearlyEqual(length9, 14.0, EPS);

	expect(true).toBe(true);
});
