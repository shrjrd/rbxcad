import { Array as JsArray } from "@rbxts/luau-polyfill";
/**
 * Build an array of at minimum a specified length from an existing array and a padding value. IF the array is already larger than the target length, it will not be shortened.
 * @param {Array} anArray - the source array to copy into the result.
 * @param {*} padding - the value to add to the new array to reach the desired length.
 * @param {number} targetLength - The desired length of the return array.
 * @returns {Array} an array of at least 'targetLength' length
 * @alias module:modeling/utils.padArrayToLength
 */
export const padArrayToLength = <T = number>(anArray: Array<T>, padding: T, targetLength: number) => {
	anArray = JsArray.slice(anArray); //anArray.slice();
	let size = anArray.size();
	//while (anArray.size() < targetLength) {
	//	anArray.push(padding);
	//}
	while (size < targetLength) {
		//(anArray as defined[]).push(padding as defined);
		anArray[size] = padding;
		size++;
	}
	return anArray;
};
