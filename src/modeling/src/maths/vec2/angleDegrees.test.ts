import { expect, test } from "@rbxts/jest-globals";

import { nearlyEqual } from "../../../test/helpers/index";
import { EPS } from "../constants";
import { angleDegrees } from "./index";

test("vec2: angleDegrees() should return correct values", () => {
	const distance1 = angleDegrees([0, 0]);
	nearlyEqual(distance1, 0.0, EPS);

	const distance2 = angleDegrees([1, 2]);
	nearlyEqual(distance2, 63.4349488, EPS);

	const distance3 = angleDegrees([1, -2]);
	nearlyEqual(distance3, -63.4349488, EPS);

	const distance4 = angleDegrees([-1, -2]);
	nearlyEqual(distance4, -116.5650511, EPS);

	const distance5 = angleDegrees([-1, 2]);
	nearlyEqual(distance5, 116.5650511, EPS);

	expect(true).toBe(true);
});
