import { expect, test } from "@rbxts/jest-globals";

import { create } from "./index";

test("create: Creates an empty geom2", () => {
	const expected = {
		sides: [],
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	expect(create()).toEqual(expected);
});

test("create: Creates a populated geom2", () => {
	const sides: [Vec2, Vec2][] = [
		[
			[0, 0],
			[1, 1],
		],
	];
	const expected = {
		sides: sides,
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	expect(create(sides)).toEqual(expected);
});
