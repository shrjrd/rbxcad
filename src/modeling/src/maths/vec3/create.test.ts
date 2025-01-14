import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create } from "./index";

test("vec3: create() should return a vec3 with initial values", () => {
	const obs = create();
	expect(compareVectors(obs, [0, 0, 0])).toBe(true);
});
