import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { fromValues } from "./index";

test("vec4: fromValues() should return a new vec4 with correct values", () => {
	const obs1 = fromValues(0, 0, 0, 0);
	expect(compareVectors(obs1, [0, 0, 0, 0])).toBe(true);

	const obs2 = fromValues(5, 4, 3, 2);
	expect(compareVectors(obs2, [5, 4, 3, 2])).toBe(true);

	const obs3 = fromValues(-5, -4, -3, -2);
	expect(compareVectors(obs3, [-5, -4, -3, -2])).toBe(true);
});
