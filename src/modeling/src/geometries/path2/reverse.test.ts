import { expect, test } from "@rbxts/jest-globals";

import { equals, fromPoints, reverse } from "./index";

test("reverse: The reverse of a path has reversed points", () => {
	const pointArray: Vec2[] = [
		[0, 0],
		[1, 1],
	];
	expect(equals(reverse(fromPoints({}, pointArray)), fromPoints({}, pointArray))).toBe(false);
});
