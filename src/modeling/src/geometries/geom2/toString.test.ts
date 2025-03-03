import { expect, test } from "@rbxts/jest-globals";

import { create, toString } from "./index";

test("toString: serialize empty geom2 into a string", () => {
	const geometry = create();
	const result = toString(geometry);
	const expected = "geom2 (0 outlines):\n[\n]\n";
	expect(result).toBe(expected);
});

test("toString: serialize geom2 into a string", () => {
	const geometry = create([
		[
			[0, 0],
			[0, 1],
			[2, 0],
		],
	]);
	const result = toString(geometry);
	const expected =
		"geom2 (1 outlines):\n[\n  [[0.0000000, 0.0000000],[0.0000000, 1.0000000],[2.0000000, 0.0000000]]\n]\n";
	expect(result).toBe(expected);
});
