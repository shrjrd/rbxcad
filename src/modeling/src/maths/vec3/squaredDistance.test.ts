import { expect, test } from "@rbxts/jest-globals";

import { nearlyEqual } from "../../../test/helpers/index";
import { EPS } from "../constants";
import { fromValues, squaredDistance } from "./index";

test("vec3: squaredDistance() should return correct values", () => {
	const vec0 = fromValues(0, 0, 0);
	const vec1 = fromValues(0, 0, 0);
	const distance1 = squaredDistance(vec0, vec1);
	nearlyEqual(distance1, 0.0, EPS);

	const vec2 = fromValues(1, 2, 3);
	const distance2 = squaredDistance(vec1, vec2);
	nearlyEqual(distance2, 14.0, EPS);

	const vec3 = fromValues(1, -2, 3);
	const distance3 = squaredDistance(vec1, vec3);
	nearlyEqual(distance3, 14.0, EPS);

	const vec4 = fromValues(-1, -2, 3);
	const distance4 = squaredDistance(vec1, vec4);
	nearlyEqual(distance4, 14.0, EPS);

	const vec5 = fromValues(-1, 2, 3);
	const distance5 = squaredDistance(vec1, vec5);
	nearlyEqual(distance5, 14.0, EPS);

	const vec6 = fromValues(1, 2, -3);
	const distance6 = squaredDistance(vec1, vec6);
	nearlyEqual(distance6, 14.0, EPS);

	const vec7 = fromValues(1, -2, -3);
	const distance7 = squaredDistance(vec1, vec7);
	nearlyEqual(distance7, 14.0, EPS);

	const vec8 = fromValues(-1, -2, -3);
	const distance8 = squaredDistance(vec1, vec8);
	nearlyEqual(distance8, 14.0, EPS);

	const vec9 = fromValues(-1, 2, -3);
	const distance9 = squaredDistance(vec1, vec9);
	nearlyEqual(distance9, 14.0, EPS);

	expect(true).toBe(true);
});
