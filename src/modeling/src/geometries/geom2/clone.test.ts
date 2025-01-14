import { expect, test } from "@rbxts/jest-globals";

import { clone, create, fromPoints } from "./index";

test("clone: Creates a clone on an empty geom2", () => {
	const expected = {
		sides: [],
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	const geometry = create();
	const another = clone(geometry);
	expect(another).never.toBe(geometry);
	expect(another).toEqual(expected);
});

test("clone: Creates a clone of a complete geom2", () => {
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
	const geometry = fromPoints(points);
	const another = clone(geometry);
	expect(another).never.toBe(geometry);
	expect(another).toEqual(expected);
});
