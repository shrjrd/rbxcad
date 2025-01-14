import { expect, test } from "@rbxts/jest-globals";

import { TAU } from "../constants";
import { cos, sin } from "./trigonometry";

test("utils: sin() should return rounded values", () => {
	expect(sin(0)).toBe(0);
	expect(sin(9)).toBe(math.sin(9));
	expect(sin(0.25 * TAU)).toBe(1);
	expect(sin(0.5 * TAU)).toBe(0);
	expect(sin(0.75 * TAU)).toBe(-1);
	expect(sin(TAU)).toBe(0);
	expect(sin(0 / 0)).toBe(0 / 0); //expect(sin(NaN)).toBe(NaN);
	expect(sin(math.huge)).toBe(0 / 0); //expect(sin(Infinity)).toBe(NaN);
});

test("utils: cos() should return rounded values", () => {
	expect(cos(0)).toBe(1);
	expect(cos(9)).toBe(math.cos(9));
	expect(cos(0.25 * TAU)).toBe(0);
	expect(cos(0.5 * TAU)).toBe(-1);
	expect(cos(0.75 * TAU)).toBe(0);
	expect(cos(TAU)).toBe(1);
	expect(cos(0 / 0)).toBe(0 / 0); //expect(cos(NaN)).toBe(NaN);
	expect(cos(math.huge)).toBe(0 / 0); //expect(cos(Infinity)).toBe(NaN);
});
