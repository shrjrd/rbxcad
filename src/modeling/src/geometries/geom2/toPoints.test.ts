import type { Vec2 } from "../../maths/types";
import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../../test/helpers/index";
import { create, toPoints, toString } from "./index";

test("toPoints: creates an empty array of points from a unpopulated geom2", () => {
	const geometry = create();
	const pointArray = toPoints(geometry);
	expect(pointArray).toEqual([]);
});

test("toPoints: creates an array of points from a populated geom2", () => {
	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const geometry = create([points]);

	toString(geometry);

	const expected = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const pointArray = toPoints(geometry);
	expect(comparePoints(pointArray, expected)).toBe(true);

	toString(geometry);
});
