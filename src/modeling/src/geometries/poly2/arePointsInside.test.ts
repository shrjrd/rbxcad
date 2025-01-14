import { expect, test } from "@rbxts/jest-globals";

import { arePointsInside, create } from "./index";

test("poly2: arePointsInside() should return proper values", () => {
	let polygon = create();
	let obs = arePointsInside([], polygon);
	expect(obs).toBe(0);

	polygon = create([
		[1, 1],
		[2, 2],
		[3, 3],
	]);
	obs = arePointsInside([], polygon);
	expect(obs).toBe(0);

	polygon = create([
		[0, 0],
		[5, 0],
		[5, 5],
		[0, 5],
	]);
	// points overlapping points
	obs = arePointsInside([[0, 0]], polygon);
	expect(obs).toBe(0);
	obs = arePointsInside([[5, 0]], polygon);
	// t.is(obs, 0) // FAILS
	obs = arePointsInside([[5, 5]], polygon);
	expect(obs).toBe(0);
	obs = arePointsInside([[0, 5]], polygon);
	expect(obs).toBe(0);
	obs = arePointsInside(
		[
			[0, 0],
			[5, 0],
			[5, 5],
			[0, 5],
		],
		polygon,
	);
	expect(obs).toBe(0);

	// points inside
	obs = arePointsInside([[1, 1]], polygon);
	expect(obs).toBe(1);
	obs = arePointsInside([[2, 2]], polygon);
	expect(obs).toBe(1);
	obs = arePointsInside([[3, 3]], polygon);
	expect(obs).toBe(1);
	obs = arePointsInside([[4, 4]], polygon);
	expect(obs).toBe(1);
	obs = arePointsInside(
		[
			[1, 1],
			[2, 2],
			[3, 3],
			[4, 4],
		],
		polygon,
	);
	expect(obs).toBe(1);

	// points on edges
	obs = arePointsInside(
		[
			[1, 0],
			[2, 0],
			[3, 5],
			[4, 5],
		],
		polygon,
	);
	expect(obs).toBe(0);
	obs = arePointsInside(
		[
			[5, 1],
			[5, 2],
			[5, 3],
			[5, 4],
		],
		polygon,
	);
	// t.is(obs, 0) // FAILS
	obs = arePointsInside(
		[
			[1, 5],
			[2, 5],
			[3, 5],
			[4, 5],
		],
		polygon,
	);
	expect(obs).toBe(0);
	obs = arePointsInside(
		[
			[0, 1],
			[0, 2],
			[0, 3],
			[0, 4],
		],
		polygon,
	);
	expect(obs).toBe(0);

	// points outside
	obs = arePointsInside([[-1, 0]], polygon);
	expect(obs).toBe(0);
	obs = arePointsInside([[-1, 1]], polygon);
	expect(obs).toBe(0);
	obs = arePointsInside([[0, -1]], polygon);
	expect(obs).toBe(0);

	obs = arePointsInside([[6, 0]], polygon);
	expect(obs).toBe(0);
	obs = arePointsInside([[5, -1]], polygon);
	expect(obs).toBe(0);
	obs = arePointsInside([[6, -1]], polygon);
	expect(obs).toBe(0);

	obs = arePointsInside([[6, 5]], polygon);
	expect(obs).toBe(0);
	obs = arePointsInside([[5, 6]], polygon);
	expect(obs).toBe(0);
	obs = arePointsInside([[6, 6]], polygon);
	expect(obs).toBe(0);

	obs = arePointsInside([[-1, 5]], polygon);
	expect(obs).toBe(0);
	obs = arePointsInside([[0, 6]], polygon);
	expect(obs).toBe(0);
	obs = arePointsInside([[-1, 6]], polygon);
	expect(obs).toBe(0);
});
