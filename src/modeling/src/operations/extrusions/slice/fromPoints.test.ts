import { expect, test } from "@rbxts/jest-globals";

import { fromPoints } from "./index";

test("slice: fromPoints() should return a new slice with correct values", () => {
	const exp1 = {
		edges: [
			[
				[1, 1, 0],
				[0, 0, 0],
			],
			[
				[0, 0, 0],
				[1, 0, 0],
			],
			[
				[1, 0, 0],
				[1, 1, 0],
			],
		],
	};
	const obs1 = fromPoints([
		[0, 0],
		[1, 0],
		[1, 1],
	]);
	expect(obs1).toEqual(exp1);
});
