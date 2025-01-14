import { expect, test } from "@rbxts/jest-globals";

import { mat4 } from "../../maths";
import extrudeWalls from "./extrudeWalls";
import slice from "./slice";

test("extrudeWalls (same shapes)", () => {
	const matrix = mat4.fromTranslation(mat4.create(), [0, 0, 10]);

	const shape0: [Vec2, Vec2][] = [];
	const shape1: [Vec2, Vec2][] = [
		[
			[-10.0, 10.0],
			[-10.0, -10.0],
		],
		[
			[-10.0, -10.0],
			[10.0, -10.0],
		],
		[
			[10.0, -10.0],
			[10.0, 10.0],
		],
		[
			[10.0, 10.0],
			[-10.0, 10.0],
		],
	];
	const shape2: [Vec2, Vec2][] = [
		// hole
		[
			[-10.0, 10.0],
			[-10.0, -10.0],
		],
		[
			[-10.0, -10.0],
			[10.0, -10.0],
		],
		[
			[10.0, -10.0],
			[10.0, 10.0],
		],
		[
			[10.0, 10.0],
			[-10.0, 10.0],
		],
		[
			[-5.0, -5.0],
			[-5.0, 5.0],
		],
		[
			[5.0, -5.0],
			[-5.0, -5.0],
		],
		[
			[5.0, 5.0],
			[5.0, -5.0],
		],
		[
			[-5.0, 5.0],
			[5.0, 5.0],
		],
	];

	const slice0 = slice.fromSides(shape0);
	const slice1 = slice.fromSides(shape1);
	const slice2 = slice.fromSides(shape2);

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

	const shape1: [Vec2, Vec2][] = [
		[
			[-10.0, 10.0],
			[-10.0, -10.0],
		],
		[
			[-10.0, -10.0],
			[10.0, -10.0],
		],
		[
			[10.0, -10.0],
			[10.0, 10.0],
		],
	];
	const shape2: [Vec2, Vec2][] = [
		[
			[-10.0, 10.0],
			[-10.0, -10.0],
		],
		[
			[-10.0, -10.0],
			[10.0, -10.0],
		],
		[
			[10.0, -10.0],
			[10.0, 10.0],
		],
		[
			[10.0, 10.0],
			[-10.0, 10.0],
		],
	];
	const shape3: [Vec2, Vec2][] = [
		[
			[2.5, -4.33013],
			[5.0, 0.0],
		],
		[
			[5.0, 0.0],
			[2.5, 4.33013],
		],
		[
			[2.5, 4.33013],
			[-2.5, 4.33013],
		],
		[
			[-2.5, 4.33013],
			[-5.0, 0.0],
		],
		[
			[-5.0, 0.0],
			[-2.5, -4.33013],
		],
		[
			[-2.5, -4.33013],
			[2.5, -4.33013],
		],
	];

	const slice1 = slice.fromSides(shape1);
	const slice2 = slice.fromSides(shape2);
	const slice3 = slice.fromSides(shape3);

	let walls = extrudeWalls(slice1, slice.transform(matrix, slice2));
	expect(walls.size()).toBe(24);

	walls = extrudeWalls(slice1, slice.transform(matrix, slice3));
	expect(walls.size()).toBe(12);

	walls = extrudeWalls(slice3, slice.transform(matrix, slice2));
	expect(walls.size()).toBe(24);
});
