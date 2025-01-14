import { expect, test } from "@rbxts/jest-globals";

import { create, fromPoints, isConvex } from "./index";

test("poly3: isConvex() should return correct values", () => {
	const ply1 = create();
	expect(isConvex(ply1)).toBe(true);

	const ply2 = fromPoints([
		[1, 1, 0],
		[1, 0, 0],
		[0, 0, 0],
	]);
	expect(isConvex(ply2)).toBe(true);

	const points2ccw = [
		[0, 0, 3],
		[10, 10, 3],
		[0, 5, 3],
	];
	const ply3 = fromPoints(points2ccw);
	expect(isConvex(ply3)).toBe(true);

	const points2cw = [
		[0, 0, 3],
		[-10, 10, 3],
		[0, 5, 3],
	];
	const ply4 = fromPoints(points2cw);
	expect(isConvex(ply4)).toBe(true);

	// V-shape
	const pointsV = [
		[0, 0, 3],
		[-10, 10, 3],
		[0, 5, 3],
		[10, 10, 3],
	];
	const ply5 = fromPoints(pointsV);
	expect(isConvex(ply5)).toBe(false);
});
