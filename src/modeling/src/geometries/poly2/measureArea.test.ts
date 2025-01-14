import { expect, test } from "@rbxts/jest-globals";

import { create, measureArea } from "./index";

test("poly2: measureArea() should return correct values", () => {
	const ply1 = create();
	const ret1 = measureArea(ply1);
	expect(ret1).toBe(0.0);

	// simple triangle
	let ply2 = create([
		[0, 0],
		[10, 0],
		[10, 10],
	]);
	let ret2 = measureArea(ply2);
	expect(ret2).toBe(50.0);

	ply2 = create([
		[10, 10],
		[10, 0],
		[0, 0],
	]);
	ret2 = measureArea(ply2);
	expect(ret2).toBe(-50.0);

	// simple square
	let ply3 = create([
		[0, 0],
		[10, 0],
		[10, 10],
		[0, 10],
	]);
	let ret3 = measureArea(ply3);
	expect(ret3).toBe(100.0);

	ply3 = create([
		[0, 10],
		[10, 10],
		[10, 0],
		[0, 0],
	]);
	ret3 = measureArea(ply3);
	expect(ret3).toBe(-100.0);

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
	const ply4 = create(points);
	const ret4 = measureArea(ply4);
	expect(ret4).toBe(19.5);
});
