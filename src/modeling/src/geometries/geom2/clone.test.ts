import type { Vec2 } from "../../maths/types";
import { expect, test } from "@rbxts/jest-globals";

import { clone, create } from "./index";

test("clone: Creates a clone on an empty geom2", () => {
	const expected = {
		outlines: [],
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
		outlines: [
			[
				[0, 0],
				[1, 0],
				[0, 1],
			],
		],
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	const geometry = create([points]);
	const another = clone(geometry);
	expect(another).never.toBe(geometry);
	expect(another).toEqual(expected);
});
