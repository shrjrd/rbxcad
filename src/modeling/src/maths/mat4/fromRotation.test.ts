import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromRotation } from "./index";

test("mat4: fromRotation() should return a mat4 with correct values", () => {
	const rotation = 90 * 0.017453292519943295;

	// invalid condition when axis is 0,0,0
	const obs1 = fromRotation(create(), rotation, [0, 0, 0]);
	expect(compareVectors(obs1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	const obs2 = fromRotation(create(), rotation, [0, 0, 1]);
	expect(compareVectors(obs2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	const obs3 = fromRotation(obs2, -rotation, [0, 0, 1]);
	expect(compareVectors(obs3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);
});
