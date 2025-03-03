import type { Vec2 } from "../../maths/types";
import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import * as mat4 from "../../maths/mat4/index";
import { create, measureBoundingBox, transform } from "./index";

test("poly2: measureBoundingBox() should return correct values", () => {
	let ply1 = create();
	let exp1 = [
		[0, 0],
		[0, 0],
	];
	let ret1 = measureBoundingBox(ply1);
	expect(compareVectors(ret1[0], exp1[0])).toBe(true);
	expect(compareVectors(ret1[1], exp1[1])).toBe(true);

	// simple triangle
	let ply2 = create([
		[0, 0],
		[0, 10],
		[10, 0],
	]);
	let exp2 = [
		[0, 0],
		[10, 10],
	];
	let ret2 = measureBoundingBox(ply2);
	expect(compareVectors(ret2[0], exp2[0])).toBe(true);
	expect(compareVectors(ret2[1], exp2[1])).toBe(true);

	// simple square
	let ply3 = create([
		[0, 0],
		[10, 0],
		[10, 10],
		[0, 10],
	]);
	let exp3 = [
		[0, 0],
		[10, 10],
	];
	let ret3 = measureBoundingBox(ply3);
	expect(compareVectors(ret3[0], exp3[0])).toBe(true);
	expect(compareVectors(ret3[1], exp3[1])).toBe(true);

	// V-shape
	const points: Vec2[] = [
		[3, 0],
		[5, 0],
		[8, 2],
		[6, 5],
		[8, 6],
		[5, 6],
		[5, 2],
		[2, 5],
		[1, 3],
		[3, 3],
	];
	let ply4 = create(points);
	let exp4 = [
		[1, 0],
		[8, 6],
	];
	let ret4 = measureBoundingBox(ply4);
	expect(compareVectors(ret4[0], exp4[0])).toBe(true);
	expect(compareVectors(ret4[1], exp4[1])).toBe(true);

	// rotated to various angles
	const rotation = mat4.fromZRotation(mat4.create(), 45 * 0.017453292519943295);
	ply1 = transform(rotation, ply1);
	ply2 = transform(rotation, ply2);
	ply3 = transform(rotation, ply3);
	ply4 = transform(rotation, ply4);
	ret1 = measureBoundingBox(ply1);
	ret2 = measureBoundingBox(ply2);
	ret3 = measureBoundingBox(ply3);
	ret4 = measureBoundingBox(ply4);
	exp1 = [
		[0, 0],
		[0, 0],
	];
	expect(compareVectors(ret1[0], exp1[0])).toBe(true);
	expect(compareVectors(ret1[1], exp1[1])).toBe(true);
	exp2 = [
		[-7.071067811865475, 0],
		[7.0710678118654755, 7.0710678118654755],
	];
	expect(compareVectors(ret2[0], exp2[0])).toBe(true);
	expect(compareVectors(ret2[1], exp2[1])).toBe(true);
	exp3 = [
		[-7.071067811865475, 0],
		[7.0710678118654755, 14.142135623730951],
	];
	expect(compareVectors(ret3[0], exp3[0])).toBe(true);
	expect(compareVectors(ret3[1], exp3[1])).toBe(true);
	exp4 = [
		[-2.121320343559642, 2.1213203435596424],
		[4.242640687119286, 9.899494936611665],
	];
	expect(compareVectors(ret4[0], exp4[0])).toBe(true);
	expect(compareVectors(ret4[1], exp4[1])).toBe(true);
});
