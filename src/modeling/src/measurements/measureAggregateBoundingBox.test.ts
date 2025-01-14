import { expect, test } from "@rbxts/jest-globals";
import { HttpService } from "@rbxts/services";

import { cube } from "../primitives";
import measureAggregateBoundingBox from "./measureAggregateBoundingBox";
import measureBoundingBox from "./measureBoundingBox";

test("measureAggregateBoundingBox (single objects)", () => {
	const aCube = cube({ size: 4, center: [4, 10, 20] });
	const bounds = measureAggregateBoundingBox(aCube);
	expect(bounds).toEqual([
		[2, 8, 18],
		[6, 12, 22],
	]);
});

test("measureAggregateBoundingBox (multiple objects)", () => {
	const cube1 = cube({ size: 4, center: [4, -10, 20] });
	const cube2 = cube({ size: 6, center: [0, -20, 20] });

	const expectedBounds = [
		[-3, -23, 17],
		[6, -8, 23],
	];
	let bounds = measureAggregateBoundingBox(cube1, cube2);

	expect(bounds).toEqual(expectedBounds);

	bounds = measureAggregateBoundingBox([cube1, cube2]);
	expect(bounds).toEqual(expectedBounds);
});

test("measureAggregateBoundingBox (multiple objects) does not change original bounds", () => {
	const cube1 = cube({ size: 4, center: [4, 10, 20] });
	const cube2 = cube({ size: 6, center: [0, 20, 20] });

	const objectBoundsBefore = HttpService.JSONEncode(measureBoundingBox(cube1, cube2)); //JSON.stringify(measureBoundingBox(cube1, cube2));
	measureAggregateBoundingBox(cube1, cube2);
	const objectBoundsAfter = HttpService.JSONEncode(measureBoundingBox(cube1, cube2)); //JSON.stringify(measureBoundingBox(cube1, cube2));

	expect(objectBoundsBefore).toBe(objectBoundsAfter);
});
