import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromNoisyPoints } from "./index";

test("plane: fromNoisyPoints() should return a new plane with correct values", () => {
	const obs1 = fromNoisyPoints(create(), [0, 0, 0], [1, 0, 0], [1, 1, 0]);
	expect(compareVectors(obs1, [0, 0, 1, 0])).toBe(true);

	const obs2 = fromNoisyPoints(obs1, [0, 6, 0], [0, 2, 2], [0, 6, 6]);
	expect(compareVectors(obs2, [1, 0, 0, 0])).toBe(true);

	// same vertices results in an invalid plane
	const obs3 = fromNoisyPoints(obs1, [0, 6, 0], [0, 6, 0], [0, 6, 0]);
	expect(compareVectors(obs3, [0 / 0, 0 / 0, 0 / 0, 0 / 0])).toBe(true);

	// co-linear vertices
	const obs4 = fromNoisyPoints(obs1, [0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 1, 0]);
	expect(compareVectors(obs4, [0, 0, 1, 0])).toBe(true);

	// random vertices
	const obs5 = fromNoisyPoints(obs1, [0, 0, 0], [5, 1, -2], [3, -2, 4], [1, 1, 0]);
	expect(
		compareVectors(obs5, [0.08054818365229491, 0.8764542170444571, 0.47469990050062555, 0.4185833634679763]),
	).toBe(true);
});
