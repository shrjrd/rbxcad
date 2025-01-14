import { expect, test } from "@rbxts/jest-globals";

import { fromPoints } from "./index";

test("fromPoints: creates populated geom2", () => {
	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const expected = {
		sides: [
			[
				[0, 1],
				[0, 0],
			],
			[
				[0, 0],
				[1, 0],
			],
			[
				[1, 0],
				[0, 1],
			],
		],
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	expect(fromPoints(points)).toEqual(expected);

	const points2: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
		[0, 0],
	];
	expect(fromPoints(points2)).toEqual(expected);
});

test("fromPoints: throws for improper points", () => {
	expect(() => fromPoints()).toThrowError();
	expect(() => (fromPoints as unknown as (a: number, b: number) => void)(0, 0)).toThrowError();
	expect(() => fromPoints([])).toThrowError();
	expect(() => fromPoints([[0, 0]])).toThrowError();
});
