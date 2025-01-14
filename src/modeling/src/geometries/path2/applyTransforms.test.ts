import { expect, test } from "@rbxts/jest-globals";

import { comparePoints, compareVectors } from "../../../test/helpers/";
import applyTransforms from "./applyTransforms";
import { fromPoints } from "./index";

test("applyTransforms: Updates a populated path with transformed points", () => {
	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const expected: Path2 = {
		points: [
			[0, 0],
			[1, 0],
			[0, 1],
		],
		isClosed: false,
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	const geometry = fromPoints({}, points);
	const updated = applyTransforms(geometry);
	expect(geometry).toBe(updated);
	expect(comparePoints(updated.points, expected.points)).toBe(true);
	expect(updated.isClosed).toBe(false);
	expect(compareVectors(updated.transforms, expected.transforms)).toBe(true);

	const updated2 = applyTransforms(updated);
	expect(updated).toBe(updated2);
	expect(comparePoints(updated2.points, expected.points)).toBe(true);
	expect(updated2.isClosed).toBe(false);
	expect(compareVectors(updated2.transforms, expected.transforms)).toBe(true);
});
