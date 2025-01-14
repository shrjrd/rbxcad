import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromTaitBryanRotation } from "./index";

test("mat4: fromTaitBryanRotation() should return a new mat4 with correct values", () => {
	const rotation = 90 * 0.017453292519943295;

	// rotation using YAW / Z
	const obs1 = fromTaitBryanRotation(create(), rotation, 0, 0);
	expect(compareVectors(obs1, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	// rotation using PITCH / Y
	const obs2 = fromTaitBryanRotation(create(), 0, rotation, 0);
	expect(compareVectors(obs2, [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1])).toBe(true);

	// rotation using ROLL / X
	const obs3 = fromTaitBryanRotation(create(), 0, 0, rotation);
	expect(compareVectors(obs3, [1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1])).toBe(true);

	const obs4 = fromTaitBryanRotation(obs3, -rotation, -rotation, -rotation);
	expect(compareVectors(obs4, [0, 0, 1, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1])).toBe(true);
});
