import { expect, test } from "@rbxts/jest-globals";

import { nearlyEqual } from "../../../test/helpers/index";
import { EPS } from "../constants";
import { fromValues, squaredDistance } from "./index";

test("vec2: squaredDistance() should return correct values", () => {
	const vec0 = fromValues(0, 0);
	const vec1 = fromValues(0, 0);
	const distance1 = squaredDistance(vec0, vec1);
	nearlyEqual(distance1, 0.0, EPS);

	const vec2 = fromValues(1, 2);
	const distance2 = squaredDistance(vec0, vec2);
	nearlyEqual(distance2, 5.0, EPS);

	const vec3 = fromValues(1, -2);
	const distance3 = squaredDistance(vec0, vec3);
	nearlyEqual(distance3, 5.0, EPS);

	const vec4 = fromValues(-1, -2);
	const distance4 = squaredDistance(vec0, vec4);
	nearlyEqual(distance4, 5.0, EPS);

	const vec5 = fromValues(-1, 2);
	const distance5 = squaredDistance(vec0, vec5);
	nearlyEqual(distance5, 5.0, EPS);

	expect(true).toBe(true);
});
