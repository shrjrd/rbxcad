import { expect, test } from "@rbxts/jest-globals";

import { comparePolygonsAsPoints } from "../../../test/helpers/";
import { fromPoints, toPoints, toString } from "./index";

test("toPoints: Creates an array of points from a populated geom3", () => {
	const points: Vec3[][] = [
		[
			[0, 0, 0],
			[1, 0, 0],
			[1, 0, 1],
		],
	];
	const geometry = fromPoints(points);

	toString(geometry);

	const expected: Vec3[][] = [
		[
			[0, 0, 0],
			[1, 0, 0],
			[1, 0, 1],
		],
	];
	const pointarray = toPoints(geometry);
	expect(pointarray).toEqual(expected);
	expect(comparePolygonsAsPoints(pointarray, expected)).toBe(true);

	toString(geometry);
});
