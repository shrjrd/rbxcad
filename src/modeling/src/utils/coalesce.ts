import type { RecursiveArray } from "./recursiveArray";
// luau-polyfill's isArray is too strict in some cases, just check if the keys are numbers instead
function isArray(arr: []) {
	if (type(arr) !== "table") {
		return false;
	}
	// eslint-disable-next-line roblox-ts/no-array-pairs
	for (const [k] of pairs(arr)) {
		if (type(k) !== "number") {
			return false;
		}
	}
	return true;
}
/**
 * Flattens and filters out nullish values from the given list of arguments.
 * The arguments can be composed of multiple depths of objects and arrays.
 * The output is a single flat array with no missing values.
 * @param {Array} arr - list of arguments
 * @returns {Array} a flat list of arguments
 * @alias module:modeling/utils.coalesce
 */
export const coalesce = <T>(arr: RecursiveArray<T>): Array<T> => flattenHelper(arr as [], []);

// Helper to recursively append to a given list.
// This is MUCH faster than other flatten methods.
const flattenHelper = (arr: [], out: []) => {
	//if (JsArray.isArray(arr)) {
	if (isArray(arr)) {
		arr.forEach((child) => flattenHelper(child, out));
	} else if (arr !== undefined) {
		out.push(arr as never);
	}
	return out;
};
