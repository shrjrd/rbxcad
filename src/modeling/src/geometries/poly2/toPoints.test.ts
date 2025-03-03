import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../../test/helpers/index";
import { create, toPoints } from "./index";

test("toPoints: creates an empty array of points from an empty poly2", () => {
	const geometry = create();
	const points = toPoints(geometry);
	expect(points).toEqual([]);
});

test("toPoints: creates an array of points from a populated poly2", () => {
	const geometry = create([
		[0, 0],
		[1, 0],
		[0, 1],
	]);
	const expected = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const points = toPoints(geometry);
	expect(comparePoints(points, expected)).toBe(true);
});
