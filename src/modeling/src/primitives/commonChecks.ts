import { Array as JsArray, Number } from "@rbxts/luau-polyfill";
// verify that the array has the given dimension, and contains Number values
export const isNumberArray = (array: number[], dimension: number) => {
	if (JsArray.isArray(array) && array.size() >= dimension) {
		return array.every((n) => Number.isFinite(n));
	}
	return false;
};

// verify that the value is a Number greater than the constant
export const isGT = (value: number, constant: number) => Number.isFinite(value) && value > constant;

// verify that the value is a Number greater than or equal to the constant
export const isGTE = (value: number, constant: number) => Number.isFinite(value) && value >= constant;
