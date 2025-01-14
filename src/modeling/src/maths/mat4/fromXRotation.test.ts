import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromXRotation } from "./index";

test("mat4: fromXRotation() should return a new mat4 with correct values", () => {
	const rotation = 90 * 0.017453292519943295;

	const obs2 = fromXRotation(create(), rotation);
	expect(compareVectors(obs2, [1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1])).toBe(true);

	const obs3 = fromXRotation(obs2, -rotation);
	expect(compareVectors(obs3, [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1])).toBe(true);
});
