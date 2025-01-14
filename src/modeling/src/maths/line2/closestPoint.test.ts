import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { closestPoint, create, fromPoints } from "./index";

test("line2: closestPoint() should return proper values", () => {
	const line1 = create();
	const x1 = closestPoint(line1, [0, 0]);
	expect(compareVectors(x1, [0, 0])).toBe(true);
	const x2 = closestPoint(line1, [0, 1]);
	expect(compareVectors(x2, [0, 0])).toBe(true);
	// const x3 = closestPoint([6, 0], line1)
	// t.true(compareVectors(x3, [6, -0])) // rounding errors

	const line2 = fromPoints(create(), [-5, 5], [5, -5]);
	const x4 = closestPoint(line2, [0, 0]);
	expect(compareVectors(x4, [0, 0])).toBe(true);
	const x5 = closestPoint(line2, [1, 0]);
	expect(compareVectors(x5, [0.5, -0.5])).toBe(true);
	const x6 = closestPoint(line2, [2, 0]);
	expect(compareVectors(x6, [1, -1])).toBe(true);
	const x7 = closestPoint(line2, [3, 0]);
	expect(compareVectors(x7, [1.5, -1.5])).toBe(true);
	const x8 = closestPoint(line2, [4, 0]);
	expect(compareVectors(x8, [2, -2])).toBe(true);
	const x9 = closestPoint(line2, [5, 0]);
	expect(compareVectors(x9, [2.5, -2.5])).toBe(true);
	const x10 = closestPoint(line2, [50, 0]);
	expect(compareVectors(x10, [25, -25])).toBe(true);

	const ya = closestPoint(line2, [-5, 5]);
	expect(compareVectors(ya, [-5, 5])).toBe(true);
	const yb = closestPoint(line2, [5, -5]);
	expect(compareVectors(yb, [5, -5])).toBe(true);

	const za = closestPoint(line2, [4, -6]);
	expect(compareVectors(za, [5, -5])).toBe(true);
	const zb = closestPoint(line2, [3, -7]);
	expect(compareVectors(zb, [5, -5])).toBe(true);

	expect(true).toBe(true);
});

test("line2: closestPoint() should return proper values (issue #1225)", () => {
	const line = fromPoints(create(), [10, 0], [0, 10]);
	const closest = closestPoint(line, [0, 0]);
	expect(compareVectors(closest, [5, 5])).toBe(true);
});
