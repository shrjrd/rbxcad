import type { Slice } from "./type";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import { create } from "./create";

/**
 * Reverse the edges of the given slice.
 *
 * @param {Slice} slice - slice to reverse
 * @returns {Slice} reverse of the slice
 * @alias module:modeling/geometries/slice.reverse
 */
export const reverse = (slice: Slice) => {
	// reverse each contour
	const contours = slice.contours.map((contour) => JsArray.reverse(JsArray.slice(contour))); //contour.slice().reverse());
	return create(contours);
};
