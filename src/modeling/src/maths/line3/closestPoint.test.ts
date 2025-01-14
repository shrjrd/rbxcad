import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { closestPoint, create, fromPoints } from "./index";

test("line3: closestPoint() should return proper values", () => {
	const line1 = create(); // line follows X axis
	const x1 = closestPoint(line1, [0, 0, 0]);
	expect(compareVectors(x1, [0, 0, 0])).toBe(true);
	const x2 = closestPoint(line1, [0, 1, 0]);
	expect(compareVectors(x2, [0, 0, 0])).toBe(true);
	const x3 = closestPoint(line1, [6, 0, 0]);
	expect(compareVectors(x3, [0, 0, 0])).toBe(true); // rounding errors

	const line2 = fromPoints(create(), [-5, -5, -5], [5, 5, 5]);
	const x4 = closestPoint(line2, [0, 0, 0]);
	expect(compareVectors(x4, [0.0, 0.0, 0.0])).toBe(true);
	const x5 = closestPoint(line2, [1, 0, 0]);
	expect(compareVectors(x5, [0.3333333333333339, 0.3333333333333339, 0.3333333333333339])).toBe(true);
	const x6 = closestPoint(line2, [2, 0, 0]);
	expect(compareVectors(x6, [0.6666666666666661, 0.6666666666666661, 0.6666666666666661])).toBe(true);
	const x7 = closestPoint(line2, [3, 0, 0]);
	expect(compareVectors(x7, [1, 1, 1])).toBe(true);
	const x8 = closestPoint(line2, [4, 0, 0]);
	expect(compareVectors(x8, [1.3333333333333348, 1.3333333333333348, 1.3333333333333348])).toBe(true);
	const x9 = closestPoint(line2, [5, 0, 0]);
	expect(compareVectors(x9, [1.666666666666667, 1.666666666666667, 1.666666666666667])).toBe(true);
	const x10 = closestPoint(line2, [50, 0, 0]);
	expect(compareVectors(x10, [16.666666666666668, 16.666666666666668, 16.666666666666668])).toBe(true);

	const ya = closestPoint(line2, [-5, -5, -5]);
	expect(compareVectors(ya, [-5, -5, -5])).toBe(true);
	const yb = closestPoint(line2, [5, 5, 5]);
	expect(compareVectors(yb, [5, 5, 5])).toBe(true);

	expect(true).toBe(true);
});
