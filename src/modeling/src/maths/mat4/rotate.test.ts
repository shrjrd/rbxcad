import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, rotate } from "./index";

test("mat4: rotate() called with out parameter should return a new mat4 with correct values", () => {
	const rotation = 90 * 0.017453292519943295;

	const idn = create();

	// invalid condition when axis is 0,0,0
	const out1: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	const ret1 = rotate(out1, idn, rotation, [0, 0, 0]);
	expect(out1).toBe(ret1);
	expect(compareVectors(out1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	const out2: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	const ret2 = rotate(out2, idn, rotation, [0, 0, 1]);
	expect(compareVectors(out2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);
	expect(compareVectors(ret2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);
	expect(out2).toBe(ret2);

	const out3 = create();
	const ret3 = rotate(out3, out3, -rotation, [0, 0, 1]);
	expect(compareVectors(out3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);
	expect(compareVectors(ret3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);
});
