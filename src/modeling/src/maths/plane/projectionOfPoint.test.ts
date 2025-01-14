import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromNormalAndPoint, projectionOfPoint } from "./index";

test("plane: projectionOfPoint() should return correct values", () => {
	const temp = create();

	const plane1 = fromNormalAndPoint(temp, [0, 0, 0], [0, 0, 0]);
	const point1 = projectionOfPoint(plane1, [0, 0, 0]);
	expect(point1).toEqual([0, 0, 0]);

	// axis aligned planes
	const plane2 = fromNormalAndPoint(temp, [0, 0, 1], [0, 0, 0]);
	const point2 = projectionOfPoint(plane2, [1, 1, 1]);
	expect(point2).toEqual([1, 1, 0]);

	const plane3 = fromNormalAndPoint(temp, [1, 0, 0], [0, 0, 0]);
	const point3 = projectionOfPoint(plane3, [1, 1, 1]);
	expect(point3).toEqual([0, 1, 1]);

	const plane4 = fromNormalAndPoint(temp, [0, 1, 0], [0, 0, 0]);
	const point4 = projectionOfPoint(plane4, [1, 1, 1]);
	expect(point4).toEqual([1, 0, 1]);

	// diagonal planes
	const plane5 = fromNormalAndPoint(temp, [1, 1, 1], [0, 0, 0]);
	const point5 = projectionOfPoint(plane5, [0, 0, 0]);
	expect(point5).toEqual([0, 0, 0]);

	const plane6 = fromNormalAndPoint(temp, [1, 1, 1], [0, 0, 0]);
	const point6 = projectionOfPoint(plane6, [3, 3, 3]);
	expect(compareVectors(point6, [0, 0, 0])).toBe(true);

	const plane7 = fromNormalAndPoint(temp, [1, 1, 1], [0, 0, 0]);
	const point7 = projectionOfPoint(plane7, [-3, -3, -3]);
	expect(compareVectors(point7, [0, 0, 0])).toBe(true);

	const plane8 = fromNormalAndPoint(temp, [1, 1, 1], [0, 0, 0]);
	const point8 = projectionOfPoint(plane8, [0, 0, 0]);
	expect(compareVectors(point8, [0, 0, 0])).toBe(true);
});
