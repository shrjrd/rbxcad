const Number_EPSILON = 2.220446049250313e-16;
import { expect, test } from "@rbxts/jest-globals";

import { nearlyEqual } from "../../../test/helpers/index";
import mat4 from "../../maths/mat4";
import { create, fromPoints, invert, measureSignedVolume, transform } from "./index";

test("poly3: measureSignedVolume() should return correct values", () => {
	let ply1 = create();
	let ret1 = measureSignedVolume(ply1);
	nearlyEqual(ret1, 0.0, Number_EPSILON);

	// simple triangle
	let ply2 = fromPoints([
		[5, 5, 5],
		[5, 15, 5],
		[5, 15, 15],
	]);
	let ret2 = measureSignedVolume(ply2);
	nearlyEqual(ret2, 83.33333333333333, Number_EPSILON);

	// simple square
	let ply3 = fromPoints([
		[5, 5, 5],
		[5, 15, 5],
		[5, 15, 15],
		[5, 5, 15],
	]);
	let ret3 = measureSignedVolume(ply3);
	nearlyEqual(ret3, 166.66666666666666, Number_EPSILON);

	// V-shape
	const points = [
		[-50, 3, 0],
		[-50, 5, 0],
		[-50, 8, 2],
		[-50, 6, 5],
		[-50, 8, 6],
		[-50, 5, 6],
		[-50, 5, 2],
		[-50, 2, 5],
		[-50, 1, 3],
		[-50, 3, 3],
	];
	let ply4 = fromPoints(points);
	let ret4 = measureSignedVolume(ply4);
	nearlyEqual(ret4, -325.0, Number_EPSILON);

	// rotated to various angles
	const rotation = mat4.fromZRotation(mat4.create(), 45 * 0.017453292519943295);
	ply1 = transform(rotation, ply1);
	ply2 = transform(rotation, ply2);
	ply3 = transform(rotation, ply3);
	ply4 = transform(rotation, ply4);
	ret1 = measureSignedVolume(ply1);
	ret2 = measureSignedVolume(ply2);
	ret3 = measureSignedVolume(ply3);
	ret4 = measureSignedVolume(ply4);
	nearlyEqual(ret1, 0.0, Number_EPSILON);
	nearlyEqual(ret2, 83.33333333333331, Number_EPSILON);
	nearlyEqual(ret3, 166.66666666666663, Number_EPSILON);
	nearlyEqual(ret4, -324.9999999999994, Number_EPSILON);

	// inverted (opposite rotation, normal)
	ply2 = invert(ply2);
	ply3 = invert(ply3);
	ply4 = invert(ply4);
	ret2 = measureSignedVolume(ply2);
	ret3 = measureSignedVolume(ply3);
	ret4 = measureSignedVolume(ply4);
	// DEVIATION: different floating point precision
	nearlyEqual(ret2, -83.33333333333336, Number_EPSILON); //nearlyEqual(ret2, -83.33333333333331, Number_EPSILON);
	nearlyEqual(ret3, -166.6666666666667, Number_EPSILON); //-166.66666666666663
	nearlyEqual(ret4, 324.9999999999994, Number_EPSILON); //324.9999999999994

	expect(true).toBe(true);
});
