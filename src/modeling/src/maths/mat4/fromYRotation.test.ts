import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromYRotation } from "./index";

test("mat4: fromYRotation() should return a new mat4 with correct values", () => {
	const rotation = 90 * 0.017453292519943295;

	const obs2 = fromYRotation(create(), rotation);
	expect(compareVectors(obs2, [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1])).toBe(true);

	const obs3 = fromYRotation(obs2, -rotation);
	expect(compareVectors(obs3, [0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1])).toBe(true);
});
