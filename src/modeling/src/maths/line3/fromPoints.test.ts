import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromPoints } from "./index";

test("line3: fromPoints() should return a new line3 with correct values", () => {
	let obs = fromPoints(create(), [0, 0, 0], [1, 0, 0]);
	let pnt = obs[0];
	let dir = obs[1];
	expect(compareVectors(pnt, [0, 0, 0])).toBe(true);
	expect(compareVectors(dir, [1, 0, 0])).toBe(true);

	obs = fromPoints(create(), [1, 0, 0], [0, 1, 0]);
	pnt = obs[0];
	dir = obs[1];
	expect(compareVectors(pnt, [1, 0, 0])).toBe(true);
	expect(compareVectors(dir, [-0.7071067811865475, 0.7071067811865475, 0])).toBe(true);

	obs = fromPoints(create(), [0, 1, 0], [1, 0, 0]);
	pnt = obs[0];
	dir = obs[1];
	expect(compareVectors(pnt, [0, 1, 0])).toBe(true);
	expect(compareVectors(dir, [0.7071067811865475, -0.7071067811865475, 0])).toBe(true);

	obs = fromPoints(obs, [0, 6, 0], [0, 0, 6]);
	pnt = obs[0];
	dir = obs[1];
	expect(compareVectors(pnt, [0, 6, 0])).toBe(true);
	expect(compareVectors(dir, [0, -0.7071067811865475, 0.7071067811865475])).toBe(true);

	// line3 created from the same points results in an invalid line3
	obs = fromPoints(obs, [0, 5, 0], [0, 5, 0]);
	pnt = obs[0];
	dir = obs[1];
	expect(compareVectors(pnt, [0, 5, 0])).toBe(true);
	expect(compareVectors(dir, [0 / 0, 0 / 0, 0 / 0])).toBe(true);
});
