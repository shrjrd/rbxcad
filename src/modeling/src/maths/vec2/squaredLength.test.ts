import { expect, test } from "@rbxts/jest-globals";

import { nearlyEqual } from "../../../test/helpers/index";
import { EPS } from "../constants";
import { fromValues, squaredLength } from "./index";

test("vec2: length() should return correct values", () => {
	const vec1 = fromValues(0, 0);
	const length1 = squaredLength(vec1);
	nearlyEqual(length1, 0.0, EPS);

	const vec2 = fromValues(1, 2);
	const length2 = squaredLength(vec2);
	nearlyEqual(length2, 5.0, EPS);

	const vec3 = fromValues(1, -2);
	const length3 = squaredLength(vec3);
	nearlyEqual(length3, 5.0, EPS);

	const vec4 = fromValues(-1, -2);
	const length4 = squaredLength(vec4);
	nearlyEqual(length4, 5.0, EPS);

	const vec5 = fromValues(-1, 2);
	const length5 = squaredLength(vec5);
	nearlyEqual(length5, 5.0, EPS);

	expect(true).toBe(true);
});
