import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create } from "./index";

test("line2: create() should return a line2 with initial values", () => {
	const obs = create();
	expect(compareVectors(obs, [0, 1, 0])).toBe(true);
});
