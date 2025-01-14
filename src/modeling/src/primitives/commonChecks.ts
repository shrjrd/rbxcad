import { Array, Number } from "@rbxts/luau-polyfill";
// verify that the array has the given dimension, and contains Number values
const isNumberArray = (array: number[], dimension: number) => {
	if (Array.isArray(array) && array.size() >= dimension) {
		return array.every((n) => Number.isFinite(n));
	}
	return false;
};

// verify that the value is a Number greater than the constant
const isGT = (value: number, constant: number) => Number.isFinite(value) && value > constant;

// verify that the value is a Number greater than or equal to the constant
const isGTE = (value: number, constant: number) => Number.isFinite(value) && value >= constant;

export default { isGT, isGTE, isNumberArray };

export { isGT, isGTE, isNumberArray };
