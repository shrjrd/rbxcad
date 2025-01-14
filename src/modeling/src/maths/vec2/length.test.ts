import { expect, test } from "@rbxts/jest-globals";

import { nearlyEqual } from "../../../test/helpers/index";
import { EPS } from "../constants";
import { fromValues, length } from "./index";

test("vec2: length() should return correct values", () => {
	const vec1 = fromValues(0, 0);
	const length1 = length(vec1);
	nearlyEqual(length1, 0.0, EPS);

	const vec2 = fromValues(1, 2);
	const length2 = length(vec2);
	nearlyEqual(length2, 2.23606, EPS);

	const vec3 = fromValues(1, -2);
	const length3 = length(vec3);
	nearlyEqual(length3, 2.23606, EPS);

	const vec4 = fromValues(-1, -2);
	const length4 = length(vec4);
	nearlyEqual(length4, 2.23606, EPS);

	const vec5 = fromValues(-1, 2);
	const length5 = length(vec5);
	nearlyEqual(length5, 2.23606, EPS);

	expect(true).toBe(true);
});
