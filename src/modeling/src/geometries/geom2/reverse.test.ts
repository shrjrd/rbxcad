import { expect, test } from "@rbxts/jest-globals";

import { comparePoints, compareVectors } from "../../../test/helpers/";
import { fromPoints, reverse } from "./index";

test("reverse: Reverses a populated geom2", () => {
	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const expected: Geom2 = {
		sides: [
			[
				[0, 1],
				[1, 0],
			],
			[
				[1, 0],
				[0, 0],
			],
			[
				[0, 0],
				[0, 1],
			],
		],
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	const geometry = fromPoints(points);
	const another = reverse(geometry);
	expect(geometry).never.toBe(another);
	expect(comparePoints(another.sides[0], expected.sides[0])).toBe(true);
	expect(comparePoints(another.sides[1], expected.sides[1])).toBe(true);
	expect(comparePoints(another.sides[2], expected.sides[2])).toBe(true);
	expect(compareVectors(another.transforms, expected.transforms)).toBe(true);
});
