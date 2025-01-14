import { expect, test } from "@rbxts/jest-globals";

import { nearlyEqual } from "../../../test/helpers/index";
import { EPS } from "../constants";
import { create, distanceToPoint, fromPoints } from "./index";

test("line2: distanceToPoint() should return proper values", () => {
	const line1 = create();
	const dis1 = distanceToPoint(line1, [0, 0]);
	nearlyEqual(dis1, 0, EPS);
	const dis2 = distanceToPoint(line1, [1, 0]);
	nearlyEqual(dis2, 0, EPS);
	const dis3 = distanceToPoint(line1, [0, 1]);
	nearlyEqual(dis3, 1, EPS);

	const line2 = fromPoints(create(), [-5, 4], [5, -6]);
	const dis4 = distanceToPoint(line2, [0, 0]);
	nearlyEqual(dis4, 0.7071067690849304, EPS);
	const dis5 = distanceToPoint(line2, [1, 0]);
	nearlyEqual(dis5, 1.4142135381698608, EPS);
	const dis6 = distanceToPoint(line2, [2, 0]);
	nearlyEqual(dis6, 2.1213203072547913, EPS);
	const dis7 = distanceToPoint(line2, [3, 0]);
	nearlyEqual(dis7, 2.8284270763397217, EPS);
	const dis8 = distanceToPoint(line2, [4, 0]);
	nearlyEqual(dis8, 3.535533845424652, EPS);
	const dis9 = distanceToPoint(line2, [5, 0]);
	nearlyEqual(dis9, 4.2426406145095825, EPS);

	expect(true).toBe(true);
});
