import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromPoints, intersectPointOfLines } from "./index";

test("line2: intersectPointOfLines() should return proper points", () => {
	const line1 = create();

	const line2 = fromPoints(create(), [1, 0], [0, 1]);
	const int2 = intersectPointOfLines(line1, line2);
	expect(compareVectors(int2, [1, 0])).toBe(true);

	// same lines opposite directions
	const line3 = fromPoints(create(), [0, 1], [1, 0]);
	const int3 = intersectPointOfLines(line3, line2);
	expect(compareVectors(int3, [0 / 0, 0 / 0])).toBe(true);

	// parallel lines
	const line4 = fromPoints(create(), [0, 6], [6, 0]);
	const int4 = intersectPointOfLines(line4, line3);
	expect(compareVectors(int4, [math.huge, -math.huge])).toBe(true);

	// intersecting lines
	const line5 = fromPoints(create(), [0, -6], [6, 0]);
	const int5 = intersectPointOfLines(line5, line4);
	expect(compareVectors(int5, [6, 0], 1e-15)).toBe(true);

	const line6 = fromPoints(create(), [-6, 0], [0, -6]);
	const int6 = intersectPointOfLines(line6, line5);
	expect(compareVectors(int6, [0, -6], 1e-15)).toBe(true);
});
