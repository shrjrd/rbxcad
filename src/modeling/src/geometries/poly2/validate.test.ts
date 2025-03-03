import { expect, test } from "@rbxts/jest-globals";

import { create, validate } from "./index";

test("validate: identifies polygons", () => {
	const ply1 = create();
	expect(() => validate(ply1)).toThrowError({ message: "poly2 not enough points 0" });

	const ply2 = create([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	expect(() => validate(ply2)).never.toThrow();

	// Clockwise
	const ply3 = create([
		[5, 5],
		[5, -5],
		[-5, -5],
		[-5, 5],
	]);
	expect(() => validate(ply3)).toThrowError({ message: "poly2 area must be greater than zero" });

	// Counterclockwise
	const ply4 = create([
		[5, 5],
		[-5, 5],
		[-5, -5],
		[5, -5],
	]);
	expect(() => validate(ply4)).never.toThrow();

	// CCW With V-side
	const ply5 = create([
		[5, 5],
		[-5, 5],
		[0, 0],
		[-5, -5],
		[5, -5],
	]);
	expect(() => validate(ply5)).never.toThrow();

	// STAR
	const ply6 = create([
		[0, 0],
		[5, 5],
		[5, -5],
		[0, 0],
		[-5, -5],
		[-5, 5],
	]);
	expect(() => validate(ply6)).toThrowError({ message: "poly2 area must be greater than zero" });

	// Counterclockwise with duplicate points
	const ply7 = create([
		[5, 5],
		[-5, 5],
		[-5, 5],
		[-5, -5],
		[5, -5],
	]);
	expect(() => validate(ply7)).toThrowError({ message: "poly2 duplicate point at 1: [-5,5]" });
});
