import { expect, test } from "@rbxts/jest-globals";

import padArrayToLength from "./padArrayToLength";

test("padArrayToLength: test an array of the proper length is unchanged.", () => {
	const srcArray = [2, 3, 4];
	const paddedArray = padArrayToLength(srcArray, undefined, 3);
	expect(srcArray).toEqual(paddedArray);
});

test("padArrayToLength: test an array that is too long is unchanged.", () => {
	const srcArray = [2, 3, 4, 5];
	const paddedArray = padArrayToLength(srcArray, undefined, 3);
	expect(srcArray).toEqual(paddedArray);
});

test("padArrayToLength: test an array that is too short is padded.", () => {
	const srcArray = [2, 3];
	const paddedArray = padArrayToLength(srcArray, 0, 3);
	expect(paddedArray).toEqual([2, 3, 0]);
});

test("padArrayToLength: test a srcArray is unaffected by the padding.", () => {
	const srcArray = [2, 3];
	padArrayToLength(srcArray, undefined, 3);
	expect(srcArray).toEqual([2, 3]);
});
