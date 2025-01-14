import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromZRotation } from "./index";

test("mat4: fromZRotation() should return a new mat4 with correct values", () => {
	const rotation = 90 * 0.017453292519943295;

	const obs2 = fromZRotation(create(), rotation);
	expect(compareVectors(obs2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	const obs3 = fromZRotation(obs2, -rotation);
	expect(compareVectors(obs3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);
});
