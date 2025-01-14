import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create } from "./index";

test("mat4: create() should return a mat4 with initial values", () => {
	const obs = create(); // identity matrix
	expect(compareVectors(obs, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);
});
