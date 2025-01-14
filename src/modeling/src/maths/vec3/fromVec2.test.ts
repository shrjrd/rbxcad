import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromVec2 } from "./index";

test("vec3: fromVec2() should return a new vec3 with correct values", () => {
	const obs1 = fromVec2(create(), [0, 0]);
	expect(compareVectors(obs1, [0, 0, 0])).toBe(true);

	const obs2 = fromVec2(obs1, [0, 1], -5);
	expect(compareVectors(obs2, [0, 1, -5])).toBe(true);
});
