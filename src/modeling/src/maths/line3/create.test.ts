import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create } from "./index";

test("line3: create() should return a line3 with initial values", () => {
	const obs = create();
	expect(compareVectors(obs[0], [0, 0, 0])).toBe(true);
	expect(compareVectors(obs[1], [0, 0, 1])).toBe(true);
});
