import { expect, test } from "@rbxts/jest-globals";

import { fromVertices } from "./index";

test("slice: fromVertices() should return a new slice with correct values", () => {
	const exp1 = {
		contours: [
			[
				[0, 0, 0],
				[1, 0, 0],
				[1, 1, 0],
			],
		],
	};
	const obs1 = fromVertices([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	expect(obs1).toEqual(exp1);
});
