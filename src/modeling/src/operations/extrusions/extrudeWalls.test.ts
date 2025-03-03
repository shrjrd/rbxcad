import { expect, test } from "@rbxts/jest-globals";

import * as slice from "../../geometries/slice/index";
import { mat4 } from "../../maths/index";
import { extrudeWalls } from "./extrudeWalls";

test("extrudeWalls (same shapes)", () => {
	const matrix = mat4.fromTranslation(mat4.create(), [0, 0, 10]);

	const slice0 = slice.create([]);
	const slice1 = slice.create([
		[
			[-10, 10, 0],
			[-10, -10, 0],
			[10, -10, 0],
			[10, 10, 0],
		],
	]);
	const slice2 = slice.create([
		[
			[-10, 10, 0],
			[-10, -10, 0],
			[10, -10, 0],
			[10, 10, 0],
		],
		[
			[-5, -5, 0],
			[5, -5, 0],
			[5, 5, 0],
			[-5, 5, 0],
		], // hole
	]);

	// empty slices
	let walls = extrudeWalls(slice0, slice0);
	expect(walls.size()).toBe(0);

	// outline slices
	walls = extrudeWalls(slice1, slice.transform(matrix, slice1));
	expect(walls.size()).toBe(8);

	// slices with holes
	walls = extrudeWalls(slice2, slice.transform(matrix, slice2));
	expect(walls.size()).toBe(16);
});

test("extrudeWalls (different shapes)", () => {
	const matrix = mat4.fromTranslation(mat4.create(), [0, 0, 10]);

	const slice1 = slice.create([
		[
			[-10, 10, 0],
			[-10, -10, 0],
			[10, -10, 0],
		],
	]);
	const slice2 = slice.create([
		[
			[-10, 10, 0],
			[-10, -10, 0],
			[10, -10, 0],
			[10, 10, 0],
		],
	]);
	const slice3 = slice.create([
		[
			[2.5, -4.33013, 0],
			[5, 0, 0],
			[2.5, 4.33013, 0],
			[-2.5, 4.33013, 0],
			[-5, 0, 0],
			[-2.5, -4.33013, 0],
		],
	]);

	let walls = extrudeWalls(slice1, slice.transform(matrix, slice2));
	expect(walls.size()).toBe(24);

	walls = extrudeWalls(slice1, slice.transform(matrix, slice3));
	expect(walls.size()).toBe(12);

	walls = extrudeWalls(slice3, slice.transform(matrix, slice2));
	expect(walls.size()).toBe(24);
});
