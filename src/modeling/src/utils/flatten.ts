import type { RecursiveArray } from "./recursiveArray";
import { Array as JsArray } from "@rbxts/luau-polyfill";
//export const flatten = (arr: any) =>
//	arr.reduce((acc: any, val: any) => (Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val)), []);
// DEVIATION: check if the first element is nil, concat [val] instead of val
/**
 * Flatten the given list of arguments into a single flat array.
 * The arguments can be composed of multiple depths of objects and arrays.
 * @param {Array} arr - list of arguments
 * @returns {Array} a flat list of arguments
 * @alias module:modeling/utils.flatten
 */
export const flatten = <T>(arr: RecursiveArray<T>): Array<T> =>
	(arr as unknown as defined[]).reduce(
		(acc, val) =>
			JsArray.isArray(val) && next(val)[0]
				? JsArray.concat(acc, flatten(val as RecursiveArray<T>))
				: JsArray.concat(acc, [val] as T),
		[] as T[],
	);
