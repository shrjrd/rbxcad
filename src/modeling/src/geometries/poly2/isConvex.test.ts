import { expect, test } from "@rbxts/jest-globals";

import { create, isConvex } from "./index";

test("poly2: isConvex() should return correct values", () => {
	const ply1 = create();
	expect(isConvex(ply1)).toBe(true);

	const ply2 = create([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	expect(isConvex(ply2)).toBe(true);

	// Counterclockwise
	const ply3 = create([
		[5, 5],
		[5, -5],
		[-5, -5],
		[-5, 5],
	]);
	expect(isConvex(ply3)).toBe(true);

	// Clockwise
	const ply4 = create([
		[5, 5],
		[-5, 5],
		[-5, -5],
		[5, -5],
	]);
	expect(isConvex(ply4)).toBe(true);

	// CCW With V-side
	const ply5 = create([
		[5, 5],
		[5, -5],
		[0, 0],
		[-5, -5],
		[-5, 5],
	]);
	expect(isConvex(ply5)).toBe(false);

	// STAR
	const ply6 = create([
		[0, 0],
		[5, 5],
		[5, -5],
		[0, 0],
		[-5, -5],
		[-5, 5],
	]);
	expect(isConvex(ply6)).toBe(false);
});
