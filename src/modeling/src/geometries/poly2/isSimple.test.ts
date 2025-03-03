import { expect, test } from "@rbxts/jest-globals";

import { create, isSimple } from "./index";

test("poly2: isSimple() should return correct values", () => {
	const ply1 = create();
	expect(isSimple(ply1)).toBe(false);

	const ply2 = create([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	expect(isSimple(ply2)).toBe(true);

	// Clockwise
	const ply3 = create([
		[5, 5],
		[5, -5],
		[-5, -5],
		[-5, 5],
	]);
	expect(isSimple(ply3)).toBe(true);

	// Counterclockwise
	const ply4 = create([
		[5, 5],
		[-5, 5],
		[-5, -5],
		[5, -5],
	]);
	expect(isSimple(ply4)).toBe(true);

	// CW With V-side
	const ply5 = create([
		[5, 5],
		[5, -5],
		[0, 0],
		[-5, -5],
		[-5, 5],
	]);
	expect(isSimple(ply5)).toBe(true);

	// STAR
	const ply6 = create([
		[0, 0],
		[5, 5],
		[5, -5],
		[0, 0],
		[-5, -5],
		[-5, 5],
	]);
	expect(isSimple(ply6)).toBe(false);

	// CROSSING
	const ply7 = create([
		[5, 5],
		[5, -5],
		[-5, 5],
		[-5, -5],
	]);
	expect(isSimple(ply7)).toBe(false);
});
