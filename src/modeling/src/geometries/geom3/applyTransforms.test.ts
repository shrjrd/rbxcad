import { expect, test } from "@rbxts/jest-globals";

import { comparePolygons, compareVectors } from "../../../test/helpers/";
import applyTransforms from "./applyTransforms";
import { fromPoints } from "./index";

test("applyTransforms: Updates a geom3 with transformed polygons", () => {
	const points: Vec3[][] = [
		[
			[0, 0, 0],
			[1, 0, 0],
			[1, 0, 1],
		],
	];
	const expected: Geom3 = {
		polygons: [
			{
				vertices: [
					[0, 0, 0],
					[1, 0, 0],
					[1, 0, 1],
				],
			},
		],
		isRetesselated: false,
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	const geometry = fromPoints(points);
	const updated = applyTransforms(geometry);
	expect(geometry).toBe(updated);
	expect(comparePolygons(updated.polygons[0], expected.polygons[0])).toBe(true);
	expect(compareVectors(updated.transforms, expected.transforms)).toBe(true);

	const updated2 = applyTransforms(updated);
	expect(updated).toBe(updated2);
	expect(comparePolygons(updated2.polygons[0], expected.polygons[0])).toBe(true);
	expect(compareVectors(updated2.transforms, expected.transforms)).toBe(true);
});
