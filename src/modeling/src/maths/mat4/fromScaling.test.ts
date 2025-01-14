import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromScaling } from "./index";

test("mat4: fromScaling() should return a new mat4 with correct values", () => {
	const obs1 = fromScaling(create(), [2, 4, 6]);
	expect(compareVectors(obs1, [2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1])).toBe(true);

	const obs2 = fromScaling(obs1, [-2, -4, -6]);
	expect(compareVectors(obs2, [-2, 0, 0, 0, 0, -4, 0, 0, 0, 0, -6, 0, 0, 0, 0, 1])).toBe(true);
});
