import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromPointAndDirection } from "./index";

test("line3: fromPointAndDirection() should return a new line3 with correct values", () => {
	let obs = fromPointAndDirection(create(), [0, 0, 0], [1, 0, 0]);
	let pnt = obs[0];
	let dir = obs[1];
	expect(compareVectors(pnt, [0, 0, 0])).toBe(true);
	expect(compareVectors(dir, [1, 0, 0])).toBe(true);

	obs = fromPointAndDirection(create(), [1, 0, 0], [0, 2, 0]);
	pnt = obs[0];
	dir = obs[1];
	expect(compareVectors(pnt, [1, 0, 0])).toBe(true);
	expect(compareVectors(dir, [0, 1, 0])).toBe(true);

	obs = fromPointAndDirection(create(), [0, 1, 0], [3, 0, 0]);
	pnt = obs[0];
	dir = obs[1];
	expect(compareVectors(pnt, [0, 1, 0])).toBe(true);
	expect(compareVectors(dir, [1, 0, 0])).toBe(true);

	obs = fromPointAndDirection(create(), [0, 0, 1], [0, 0, 4]);
	pnt = obs[0];
	dir = obs[1];
	expect(compareVectors(pnt, [0, 0, 1])).toBe(true);
	expect(compareVectors(dir, [0, 0, 1])).toBe(true);

	// line3 created from a bad direction results in an invalid line3
	obs = fromPointAndDirection(create(), [0, 5, 0], [0, 0, 0]);
	pnt = obs[0];
	dir = obs[1];
	expect(compareVectors(pnt, [0, 5, 0])).toBe(true);
	expect(compareVectors(dir, [0 / 0, 0 / 0, 0 / 0])).toBe(true);
});
