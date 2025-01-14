import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromAngleDegrees } from "./index";

test("vec2: fromAngleDegrees() should return a new vec2 with correct values", () => {
	const obs1 = fromAngleDegrees(create(), 0);
	expect(compareVectors(obs1, [1.0, 0.0])).toBe(true);

	const obs2 = fromAngleDegrees(obs1, 180);
	expect(compareVectors(obs2, [-1, 1.2246468525851679e-16])).toBe(true);
});
