import { expect, test } from "@rbxts/jest-globals";

import { nearlyEqual } from "../../../test/helpers/index";
import { EPS } from "../constants";
import { angle, fromValues } from "./index";

test("vec3: angle() should return correct values", () => {
	const vec0 = fromValues(5, 5, 5);
	const vec1 = fromValues(0, 0, 0);
	const angle1 = angle(vec0, vec1);
	nearlyEqual(angle1, 1.57079, EPS); // any vector with all zeros

	const veca3 = fromValues(1, 0, 0);
	const vec3 = fromValues(1, 0, 0);
	const angle3 = angle(veca3, vec3);
	nearlyEqual(angle3, 0.0, EPS);

	const veca2 = fromValues(1, 0, 0);
	const vec2 = fromValues(0, 1, 0);
	const angle2 = angle(veca2, vec2);
	nearlyEqual(angle2, 1.57079, EPS);

	const veca4 = fromValues(1, 1, 1);
	const vec4 = fromValues(-1, -1, -1);
	const angle4 = angle(veca4, vec4);
	nearlyEqual(angle4, 3.14159, EPS);

	const vec5a = fromValues(1, 0, 0);
	const vec5b = fromValues(1, 1, 0);
	const angle5 = angle(vec5a, vec5b);
	nearlyEqual(angle5, 0.785398, EPS);

	expect(true).toBe(true);
});
