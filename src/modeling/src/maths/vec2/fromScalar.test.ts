import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromScalar } from "./index";

test("vec2: fromScalar() should return a new vec2 with correct values", () => {
	const obs1 = fromScalar(create(), 0);
	expect(compareVectors(obs1, [0, 0])).toBe(true);

	const obs2 = fromScalar(obs1, -5);
	expect(compareVectors(obs2, [-5, -5])).toBe(true);
});
