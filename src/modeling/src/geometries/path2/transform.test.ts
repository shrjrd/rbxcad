import { expect, test } from "@rbxts/jest-globals";

import { comparePoints, compareVectors } from "../../../test/helpers/";
import mat4 from "../../maths/mat4";
import { fromPoints, toPoints, transform } from "./index";

test("transform: adjusts the transforms of path", () => {
	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const rotation = 90 * 0.017453292519943295;
	const rotate90 = mat4.fromZRotation(mat4.create(), rotation);

	// continue with typical user scenario, several iterations of transforms and access

	// expect lazy transform, i.e. only the transforms change
	const expected: Path2 = {
		points: [
			[0, 0],
			[1, 0],
			[0, 1],
		],
		isClosed: false,
		transforms: [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	const geometry = fromPoints({}, points);
	let another = transform(rotate90, geometry);
	expect(geometry).never.toBe(another);
	expect(comparePoints(another.points, expected.points)).toBe(true);
	expect(another.isClosed).toBe(false);
	expect(compareVectors(another.transforms, expected.transforms)).toBe(true);

	// expect lazy transform, i.e. only the transforms change
	expected.transforms = [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1];
	another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another);
	expect(comparePoints(another.points, expected.points)).toBe(true);
	expect(another.isClosed).toBe(false);
	expect(compareVectors(another.transforms, expected.transforms)).toBe(true);

	// expect application of the transforms to the sides
	expected.points = [
		[5, 10],
		[5, 11],
		[4, 10],
	];
	expected.transforms = mat4.create();
	toPoints(another);
	expect(comparePoints(another.points, expected.points)).toBe(true);
	expect(another.isClosed).toBe(false);
	expect(compareVectors(another.transforms, expected.transforms)).toBe(true);

	// expect lazy transform, i.e. only the transforms change
	expected.transforms = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1];
	another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another);
	expect(comparePoints(another.points, expected.points)).toBe(true);
	expect(another.isClosed).toBe(false);
	expect(compareVectors(another.transforms, expected.transforms)).toBe(true);
});
