import { expect, test } from "@rbxts/jest-globals";

import { create, toString } from "./index";

test("toString: serialize poly2 into a string", () => {
	const geometry = create([
		[0, 0],
		[0, 1],
		[2, 0],
	]);
	const result = toString(geometry);
	const expected = "poly2: [[0.0000000, 0.0000000], [0.0000000, 1.0000000], [2.0000000, 0.0000000]]";
	expect(result).toBe(expected);
});
