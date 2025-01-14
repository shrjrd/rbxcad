import { expect, test } from "@rbxts/jest-globals";

import { comparePoints, compareVectors } from "../../../test/helpers/";
import mat4 from "../../maths/mat4";
import { measureArea } from "../../measurements/index.js";
import { mirrorX, mirrorY, mirrorZ } from "../../operations/transforms/index.js";
import { square } from "../../primitives/index.js";
import { fromPoints, toOutlines, toSides, transform } from "./index.js";

test("transform: adjusts the transforms of geom2", () => {
	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const rotation = 90 * 0.017453292519943295;
	const rotate90 = mat4.fromZRotation(mat4.create(), rotation);

	// continue with typical user scenario, several iterations of transforms and access

	// expect lazy transform, i.e. only the transforms change
	const expected: Geom2 = {
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
		transforms: [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	const geometry = fromPoints(points);
	let another = transform(rotate90, geometry);
	expect(geometry).never.toBe(another);
	expect(comparePoints(another.sides[0], expected.sides[0])).toBe(true);
	expect(comparePoints(another.sides[1], expected.sides[1])).toBe(true);
	expect(comparePoints(another.sides[2], expected.sides[2])).toBe(true);
	expect(compareVectors(another.transforms, expected.transforms)).toBe(true);

	// expect lazy transform, i.e. only the transforms change
	expected.transforms = [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1];
	another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another);
	expect(comparePoints(another.sides[0], expected.sides[0])).toBe(true);
	expect(comparePoints(another.sides[1], expected.sides[1])).toBe(true);
	expect(comparePoints(another.sides[2], expected.sides[2])).toBe(true);
	expect(compareVectors(another.transforms, expected.transforms)).toBe(true);

	// expect application of the transforms to the sides
	expected.sides = [
		[
			[4, 10],
			[5, 10],
		],
		[
			[5, 10],
			[5, 11],
		],
		[
			[5, 11],
			[4, 10],
		],
	];
	expected.transforms = mat4.create();
	toSides(another);
	expect(comparePoints(another.sides[0], expected.sides[0])).toBe(true);
	expect(comparePoints(another.sides[1], expected.sides[1])).toBe(true);
	expect(comparePoints(another.sides[2], expected.sides[2])).toBe(true);
	expect(compareVectors(another.transforms, expected.transforms)).toBe(true);

	// expect lazy transform, i.e. only the transforms change
	expected.transforms = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1];
	another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another);
	expect(comparePoints(another.sides[0], expected.sides[0])).toBe(true);
	expect(comparePoints(another.sides[1], expected.sides[1])).toBe(true);
	expect(comparePoints(another.sides[2], expected.sides[2])).toBe(true);
	expect(compareVectors(another.transforms, expected.transforms)).toBe(true);
});

test("transform: geom2 mirrorX", () => {
	const geometry = square();
	const transformed = mirrorX(geometry) as Geom2;
	expect(measureArea(geometry)).toBe(4);
	// area will be negative unless we reversed the points
	expect(measureArea(transformed)).toBe(4);
	const pts = toOutlines(transformed)[0];
	const exp: Vec2[] = [
		[-1, 1],
		[-1, -1],
		[1, -1],
		[1, 1],
	];
	expect(comparePoints(pts, exp)).toBe(true);
	expect(toSides(transformed)).toEqual([
		[
			[1, 1],
			[-1, 1],
		],
		[
			[-1, 1],
			[-1, -1],
		],
		[
			[-1, -1],
			[1, -1],
		],
		[
			[1, -1],
			[1, 1],
		],
	]);
});

test("transform: geom2 mirrorY", () => {
	const geometry = square();
	const transformed = mirrorY(geometry) as Geom2;
	expect(measureArea(geometry)).toBe(4);
	// area will be negative unless we reversed the points
	expect(measureArea(transformed)).toBe(4);
	const pts = toOutlines(transformed)[0];
	const exp: Vec2[] = [
		[1, -1],
		[1, 1],
		[-1, 1],
		[-1, -1],
	];
	expect(comparePoints(pts, exp)).toBe(true);
	expect(toSides(transformed)).toEqual([
		[
			[-1, -1],
			[1, -1],
		],
		[
			[1, -1],
			[1, 1],
		],
		[
			[1, 1],
			[-1, 1],
		],
		[
			[-1, 1],
			[-1, -1],
		],
	]);
});

test("transform: geom2 mirrorZ", () => {
	const geometry = square();
	const transformed = mirrorZ(geometry) as Geom2;
	expect(measureArea(geometry)).toBe(4);
	// area will be negative unless we DIDN'T reverse the points
	expect(measureArea(transformed)).toBe(4);
	const pts = toOutlines(transformed)[0];
	const exp: Vec2[] = [
		[-1, -1],
		[1, -1],
		[1, 1],
		[-1, 1],
	];
	expect(comparePoints(pts, exp)).toBe(true);
	expect(toSides(transformed)).toEqual([
		[
			[-1, 1],
			[-1, -1],
		],
		[
			[-1, -1],
			[1, -1],
		],
		[
			[1, -1],
			[1, 1],
		],
		[
			[1, 1],
			[-1, 1],
		],
	]);
});
