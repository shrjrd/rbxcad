import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromTranslation } from "./index";

test("mat4: fromTranslation() should return a new mat4 with correct values", () => {
	const obs1 = fromTranslation(create(), [2, 4, 6]);
	expect(compareVectors(obs1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 4, 6, 1])).toBe(true);

	const obs2 = fromTranslation(obs1, [-2, -4, -6]);
	expect(compareVectors(obs2, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2, -4, -6, 1])).toBe(true);
});
