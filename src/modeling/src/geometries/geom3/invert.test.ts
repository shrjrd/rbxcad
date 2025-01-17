import { expect, test } from "@rbxts/jest-globals";

import { comparePolygons, compareVectors } from "../../../test/helpers/";
import { create, fromPoints, invert } from "./index";

test("invert: Creates a invert on an empty geom3", () => {
	const expected = {
		polygons: [],
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	const geometry = create();
	const another = invert(geometry);
	expect(another).never.toBe(geometry);
	expect(another).toEqual(expected);
});

test("invert: Creates a invert of a populated geom3", () => {
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
					[1, 0, 1],
					[1, 0, 0],
					[0, 0, 0],
				],
			},
		],
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	const geometry = fromPoints(points);
	const another = invert(geometry);
	expect(another).never.toBe(geometry);
	expect(comparePolygons(another.polygons[0], expected.polygons[0])).toBe(true);
	expect(compareVectors(another.transforms, expected.transforms)).toBe(true);
});
