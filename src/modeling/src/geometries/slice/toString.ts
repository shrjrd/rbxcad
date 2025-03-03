import type { Slice } from "./type";
import * as vec3 from "../../maths/vec3/index";

/**
 * Convert the given slice to a readable string.
 * @param {Slice} slice - the slice
 * @return {String} the string representation
 * @alias module:modeling/geometries/slice.toString
 */
export const toString = (slice: Slice) => {
	let result = "slice (" + slice.contours.size() + " contours):\n[\n";
	slice.contours.forEach((contour) => {
		result += "  [" + contour.map(vec3.toString).join(",") + "],\n";
	});
	result += "]\n";
	return result;
};
