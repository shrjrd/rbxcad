import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromNormalAndPoint } from "./index";

test("plane: fromNormalAndPoint() should return a new plant with correct values", () => {
	const obs1 = fromNormalAndPoint(create(), [5, 0, 0], [0, 0, 0]);
	expect(compareVectors(obs1, [1, 0, 0, 0])).toBe(true);

	const obs2 = fromNormalAndPoint(obs1, [0, 0, 5], [5, 5, 5]);
	expect(compareVectors(obs2, [0, 0, 1, 5])).toBe(true);
});
