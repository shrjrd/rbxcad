import { expect, test } from "@rbxts/jest-globals";

import equals from "./equals";

test("vec3: equals() should return correct booleans", () => {
	const veca: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	const vecb: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	expect(equals(veca, vecb)).toBe(true);

	const vecb0: Mat4 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	expect(equals(veca, vecb0)).toBe(false);

	const vecb1: Mat4 = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	expect(equals(veca, vecb1)).toBe(false);

	const vecb2: Mat4 = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	expect(equals(veca, vecb2)).toBe(false);

	const vecb3: Mat4 = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	expect(equals(veca, vecb3)).toBe(false);

	const vecb4: Mat4 = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	expect(equals(veca, vecb4)).toBe(false);

	const vecb5: Mat4 = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	expect(equals(veca, vecb5)).toBe(false);

	const vecb6: Mat4 = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	expect(equals(veca, vecb6)).toBe(false);

	const vecb7: Mat4 = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];
	expect(equals(veca, vecb7)).toBe(false);

	const vecb8: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
	expect(equals(veca, vecb8)).toBe(false);

	const vecb9: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
	expect(equals(veca, vecb9)).toBe(false);

	const vecb10: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
	expect(equals(veca, vecb10)).toBe(false);

	const vecb11: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0];
	expect(equals(veca, vecb11)).toBe(false);

	const vecb12: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
	expect(equals(veca, vecb12)).toBe(false);

	const vecb13: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
	expect(equals(veca, vecb13)).toBe(false);

	const vecb14: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
	expect(equals(veca, vecb14)).toBe(false);

	const vecb15: Mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
	expect(equals(veca, vecb15)).toBe(false);
});
