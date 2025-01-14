import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromPoints } from "./index";

test("plane: fromPoints() should return a new plane with correct values", () => {
	const obs1 = fromPoints(create(), [0, 0, 0], [1, 0, 0], [1, 1, 0]);
	expect(compareVectors(obs1, [0, 0, 1, 0])).toBe(true);

	const obs2 = fromPoints(obs1, [0, 6, 0], [0, 2, 2], [0, 6, 6]);
	expect(compareVectors(obs2, [-1, 0, 0, 0])).toBe(true);

	// planes created from the same points results in an invalid plane
	const obs3 = fromPoints(obs1, [0, 6, 0], [0, 6, 0], [0, 6, 0]);
	expect(compareVectors(obs3, [0 / 0, 0 / 0, 0 / 0, 0 / 0])).toBe(true);

	// polygon with co-linear vertices
	const obs4 = fromPoints(obs1, [0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 1, 0]);
	expect(compareVectors(obs4, [0, 0, 1, 0])).toBe(true);
});
