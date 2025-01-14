import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create } from "./index";

test("vec2: create() should return a vec2 with initial values", () => {
	const obs = create();
	expect(compareVectors(obs, [0, 0])).toBe(true);
});
