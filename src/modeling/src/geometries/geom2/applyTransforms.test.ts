import { expect, test } from "@rbxts/jest-globals";

import applyTransforms from "./applyTransforms";
import { fromPoints } from "./index";

test("applyTransforms: Updates a populated geom2 with transformed sides", () => {
	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const expected = {
		sides: [
			[
				[0, 1],
				[0, 0],
			],
			[
				[0, 0],
				[1, 0],
			],
			[
				[1, 0],
				[0, 1],
			],
		],
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	const geometry = fromPoints(points);
	const updated = applyTransforms(geometry);
	expect(geometry).toBe(updated);
	expect(updated).toEqual(expected);

	const updated2 = applyTransforms(updated);
	expect(updated).toBe(updated2);
	expect(updated).toEqual(expected);
});
