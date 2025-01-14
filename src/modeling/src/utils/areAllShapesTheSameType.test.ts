import { expect, test } from "@rbxts/jest-globals";

import { cube, square } from "../primitives";
import { areAllShapesTheSameType } from "./index";

test("utils: areAllShapesTheSameType() should return correct values", () => {
	const geometry2 = square();
	const geometry3 = cube();

	expect(areAllShapesTheSameType([])).toBe(true);
	expect(areAllShapesTheSameType([geometry2])).toBe(true);
	expect(areAllShapesTheSameType([geometry3])).toBe(true);
	expect(areAllShapesTheSameType([geometry2, geometry2])).toBe(true);
	expect(areAllShapesTheSameType([geometry3, geometry3])).toBe(true);
	expect(areAllShapesTheSameType([geometry2, geometry3])).toBe(false);
});
