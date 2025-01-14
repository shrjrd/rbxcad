import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, normal } from "./index";

test("vec2: normal() with two params should update a vec2 with correct values", () => {
	const out1 = create();
	const ret1 = normal(out1, [0, 0]);
	expect(compareVectors(out1, [0, 0])).toBe(true);
	expect(compareVectors(ret1, [0, 0])).toBe(true);
	expect(out1).toBe(ret1);

	const out2 = create();
	const ret2 = normal(out2, [1, 2]);
	expect(compareVectors(out2, [-2, 1], 1e-15)).toBe(true);
	expect(compareVectors(ret2, [-2, 1], 1e-15)).toBe(true);
	expect(out2).toBe(ret2);

	const out3 = create();
	const ret3 = normal(out3, [-1, -2]);
	expect(compareVectors(out3, [2, -1], 1e-15)).toBe(true);
	expect(compareVectors(ret3, [2, -1], 1e-15)).toBe(true);
	expect(out3).toBe(ret3);

	const out4 = create();
	const ret4 = normal(out4, [-1, 2]);
	expect(compareVectors(out4, [-2, -1], 1e-15)).toBe(true);
	expect(compareVectors(ret4, [-2, -1], 1e-15)).toBe(true);
	expect(out4).toBe(ret4);
});
