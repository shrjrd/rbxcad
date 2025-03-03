import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { TAU } from "../../maths/constants";
import { mat4 } from "../../maths/index";
import { calculatePlane, create, fromVertices, transform } from "./index";

test("slice: calculatePlane() returns correct plans for various slices", () => {
	// do not do this... it's an error
	// const slice1 = create()
	// const plane1 = calculatePlane(slice1)

	const slice2 = fromVertices([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	const plane2 = calculatePlane(slice2);
	expect(compareVectors(plane2, [0, 0, 1, 0])).toBe(true);

	const slice3 = transform(mat4.fromXRotation(mat4.create(), TAU / 4), slice2);
	const plane3 = calculatePlane(slice3);
	expect(compareVectors(plane3, [0, -1, 0, 0])).toBe(true);

	const slice4 = transform(mat4.fromZRotation(mat4.create(), TAU / 4), slice3);
	const plane4 = calculatePlane(slice4);
	expect(compareVectors(plane4, [1, 0, 0, 0])).toBe(true);

	// Issue #749
	const slice5 = fromVertices([
		[-4, 0, 2],
		[4, 0, 2],
		[4, 5, 2],
		[6, 5, 2],
		[4, 7, 2],
		[-4, 7, 2],
		[-6, 5, 2],
		[-4, 5, 2],
	]);
	const plane5 = calculatePlane(slice5);
	expect(compareVectors(plane5, [0, 0, 1, 2])).toBe(true);

	const slice6 = fromVertices([
		[4, 0, 0],
		[-4, 0, 0],
		[-4, 5, 0],
		[-6, 5, 0],
		[-4, 7, 0],
		[4, 7, 0],
		[6, 5, 0],
		[4, 5, 0],
	]);
	const plane6 = calculatePlane(slice6);
	expect(compareVectors(plane6, [0, 0, -1, 0])).toBe(true);

	// from extrude tests
	const slice7 = create([
		[
			[-10, 10, 0],
			[-10, -10, 0],
			[10, -10, 0],
			[10, 10, 0],
		],
		[
			[-5, -5, 0],
			[-5, 5, 0],
			[5, 5, 0],
			[5, -5, 0],
		],
	]);
	const plane7 = calculatePlane(slice7);
	expect(compareVectors(plane7, [0, 0, 1, 0])).toBe(true);
});
