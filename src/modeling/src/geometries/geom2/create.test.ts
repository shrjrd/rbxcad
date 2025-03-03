import { Vec2 } from "../../maths/types";
import { expect, test } from "@rbxts/jest-globals";

import { create } from "./index";

test("create: Creates an empty geom2", () => {
	const expected = {
		outlines: [],
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	expect(create()).toEqual(expected);
});

test("create: Creates a populated geom2", () => {
	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const expected = {
		outlines: [
			[
				[0, 0],
				[1, 0],
				[0, 1],
			],
		],
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	expect(create([points])).toEqual(expected);
});
