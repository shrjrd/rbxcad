import type { Vec2 } from "../../maths/types";
import type { Geom2 } from "../types";
import { expect, test } from "@rbxts/jest-globals";

import { comparePoints, compareVectors } from "../../../test/helpers/index";
import { mat4 } from "../../maths/index";
import { measureArea } from "../../measurements/index";
import { mirrorX, mirrorY, mirrorZ } from "../../operations/transforms/index";
import { square } from "../../primitives/index";
import { create, toOutlines, toSides, transform } from "./index";

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
	const expected = {
		outlines: [
			[
				[0, 0],
				[1, 0],
				[0, 1],
			],
		],
		transforms: [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	const geometry = create([points]);
	let another = transform(rotate90, geometry);
	expect(geometry).never.toBe(another);
	expect(comparePoints(another.outlines[0], expected.outlines[0])).toBe(true);
	expect(compareVectors(another.transforms, expected.transforms)).toBe(true);

	// expect lazy transform, i.e. only the transforms change
	expected.transforms = [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1];
	another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another);
	expect(comparePoints(another.outlines[0], expected.outlines[0])).toBe(true);
	expect(compareVectors(another.transforms, expected.transforms)).toBe(true);

	// expect application of the transforms to the sides
	const expectedSides = [
		[
			[5, 10],
			[5, 11],
		],
		[
			[5, 11],
			[4, 10],
		],
		[
			[4, 10],
			[5, 10],
		],
	];
	const sides = toSides(another);
	expect(comparePoints(sides[0], expectedSides[0])).toBe(true);
	expect(comparePoints(sides[1], expectedSides[1])).toBe(true);
	expect(comparePoints(sides[2], expectedSides[2])).toBe(true);

	// expect application of the transforms to the outlines
	const expectedOutline = [
		[5, 10],
		[5, 11],
		[4, 10],
	];
	const outlines = toOutlines(another);
	expect(outlines.size()).toBe(1);
	expect(comparePoints(outlines[0], expectedOutline)).toBe(true);

	// expect lazy transform, i.e. only the transforms change
	expected.transforms = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1];
	another.outlines = [
		[
			[0, 0],
			[1, 0],
			[0, 1],
		],
	];
	another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another);
	expect(comparePoints(another.outlines[0], expected.outlines[0])).toBe(true);
	expect(compareVectors(another.transforms, expected.transforms)).toBe(true);
});

test("transform: geom2 mirrorX", () => {
	const geometry = square();
	const transformed = mirrorX(geometry) as Geom2;
	expect(measureArea(geometry)).toBe(4);
	// area will be negative unless we reversed the points
	expect(measureArea(transformed)).toBe(4);
	const pts = toOutlines(transformed)[0];
	const exp = [
		[1, 1],
		[-1, 1],
		[-1, -1],
		[1, -1],
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
	const exp = [
		[-1, -1],
		[1, -1],
		[1, 1],
		[-1, 1],
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
	const exp = [
		[-1, -1],
		[1, -1],
		[1, 1],
		[-1, 1],
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
