import { expect, test } from "@rbxts/jest-globals";

import { comparePolygons, compareVectors } from "../../../test/helpers/";
import { fromPoints } from "./index";

test("fromPoints: Creates a populated geom3", () => {
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
	const obs = fromPoints(points);
	expect(comparePolygons(obs.polygons[0], expected.polygons[0])).toBe(true);
	expect(compareVectors(obs.transforms, expected.transforms)).toBe(true);
});

test("fromPoints: throws for improper points", () => {
	expect(() => fromPoints()).toThrowError(); // ({ instanceOf: Error });
	expect(() => (fromPoints as unknown as (a: number, b: number, c: number) => void)(0, 0, 0)).toThrowError(); // ({ instanceOf: Error });
});
