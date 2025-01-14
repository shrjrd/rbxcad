import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, rotateY } from "./index";

test("mat4: rotateY() called with out parameter should return a new mat4 with correct values", () => {
	const rotation = 90 * 0.017453292519943295;

	const idn = create();

	const out2: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	const ret2 = rotateY(out2, idn, rotation);
	expect(compareVectors(out2, [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1])).toBe(true);
	expect(compareVectors(ret2, [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1])).toBe(true);
	expect(out2).toBe(ret2);

	const out3 = create();
	const ret3 = rotateY(out3, out3, -rotation);
	expect(compareVectors(out3, [0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1])).toBe(true);
	expect(compareVectors(ret3, [0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1])).toBe(true);
});
