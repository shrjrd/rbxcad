import type { Path2 } from "../types";
import * as vec2 from "../../maths/vec2/index";
import { toPoints } from "./toPoints";

/**
 * Create a string representing the contents of the given path.
 * @param {Path2} geometry - the path
 * @returns {string} a representative string
 * @alias module:modeling/geometries/path2.toString
 *
 * @example
 * console.out(toString(path))
 */
export const toString = (geometry: Path2) => {
	const points = toPoints(geometry);
	let result = "path (" + points.size() + " points, " + geometry.isClosed + "):\n[\n";
	points.forEach((point) => {
		result += "  " + vec2.toString(point) + ",\n";
	});
	result += "]\n";
	return result;
};
