import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import plane from "../plane/";
import { create, fromPoints, intersectPointOfLineAndPlane } from "./index";

test("line3: intersectPointOfLineAndPlane() should return a new line3 with correct values", () => {
	const planeXY = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [1, 1, 0]); // flat on XY
	const planeXZ = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [0, 0, 1]); // flat on XZ
	const planeYZ = plane.fromPoints(plane.create(), [0, 0, 0], [0, 1, 0], [0, 0, 1]); // flat on YZ

	const line1 = fromPoints(create(), [0, 0, 0], [1, 0, 0]);
	// const line2 = fromPoints(create(), [1, 0, 0], [1, 1, 0])
	// const line3 = fromPoints(create(), [0, 6, 0], [0, 0, 6])

	let obs = intersectPointOfLineAndPlane(line1, planeXY); // no intersection, line on plane
	expect(compareVectors(obs, [0 / 0, 0 / 0, 0 / 0])).toBe(true);

	obs = intersectPointOfLineAndPlane(line1, planeXY);
	expect(compareVectors(obs, [0, 6, 0])).toBe(true);

	obs = intersectPointOfLineAndPlane(line1, planeXZ);
	expect(compareVectors(obs, [0, 0, 6])).toBe(true);

	obs = intersectPointOfLineAndPlane(line1, planeYZ); // no intersection, line parallel to plane
	expect(compareVectors(obs, [0 / 0, math.huge, 0 / 0])).toBe(true);
});
