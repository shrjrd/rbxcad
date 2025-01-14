import { expect, test } from "@rbxts/jest-globals";

import { fromSides } from "./index";

test("slice: fromSides() should return a new slice with correct values", () => {
	const exp1 = {
		edges: [
			[
				[0, 0, 0],
				[1, 0, 0],
			],
			[
				[1, 0, 0],
				[1, 1, 0],
			],
			[
				[1, 1, 0],
				[0, 0, 0],
			],
		],
	};
	const obs1 = fromSides([
		[
			[0, 0],
			[1, 0],
		],
		[
			[1, 0],
			[1, 1],
		],
		[
			[1, 1],
			[0, 0],
		],
	]);
	expect(obs1).toEqual(exp1);
});
