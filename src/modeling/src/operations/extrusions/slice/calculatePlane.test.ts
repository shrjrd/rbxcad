import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../../test/helpers/index";
import { mat4 } from "../../../maths";
import { TAU } from "../../../maths/constants";
import { calculatePlane, fromPoints, transform } from "./index";

test("slice: calculatePlane() returns correct plans for various slices", () => {
	// do not do this... it's an error
	// const slice1 = create()
	// const plane1 = calculatePlane(slice1)

	const slice2 = fromPoints([
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
	const slice5 = fromPoints([
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

	const slice6 = fromPoints([
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
});
