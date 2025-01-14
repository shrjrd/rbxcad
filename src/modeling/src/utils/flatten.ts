import { Array as JsArray } from "@rbxts/luau-polyfill";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}

/**
 * Flatten the given list of arguments into a single flat array.
 * The arguments can be composed of multiple depths of objects and arrays.
 * @param {Array} arr - list of arguments
 * @returns {Array} a flat list of arguments
 * @alias module:modeling/utils.flatten
 */

const flatten = <T>(arr: RecursiveArray<T>): Array<T> =>
	(arr as unknown as defined[]).reduce(
		(acc: T[], val) =>
			JsArray.isArray(val) && next(val)[0]
				? JsArray.concat(acc, flatten(val as RecursiveArray<T>))
				: JsArray.concat(acc, [val as T]),
		[] as T[],
	);

export default flatten;
