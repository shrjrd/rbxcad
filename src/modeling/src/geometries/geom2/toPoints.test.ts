import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../../test/helpers/";
import { create, fromPoints, toPoints, toString } from "./index";

test("toPoints: creates an empty array of points from a unpopulated geom2", () => {
	const geometry = create();
	const pointarray = toPoints(geometry);
	expect(pointarray).toEqual([]);
});

test("toPoints: creates an array of points from a populated geom2", () => {
	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const geometry = fromPoints(points);

	toString(geometry);

	const expected: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const pointarray = toPoints(geometry);
	expect(comparePoints(pointarray, expected)).toBe(true);

	toString(geometry);
});
