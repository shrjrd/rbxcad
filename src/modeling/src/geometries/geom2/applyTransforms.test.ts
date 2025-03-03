import type { Vec2 } from "../../maths/types";
import { expect, test } from "@rbxts/jest-globals";

import { applyTransforms } from "./applyTransforms";
import { create } from "./index";

test("applyTransforms: Updates a populated geom2 with transforms", () => {
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
	const updated = applyTransforms(geometry);
	expect(geometry).toBe(updated);
	expect(updated).toEqual(expected);

	const updated2 = applyTransforms(updated);
	expect(updated).toBe(updated2);
	expect(updated).toEqual(expected);
});
