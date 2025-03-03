import type { Geom2 } from "../types";
import * as vec2 from "../../maths/vec2/index";
import { toOutlines } from "./toOutlines";

/**
 * Create a string representing the contents of the given geometry.
 * @param {Geom2} geometry - the geometry
 * @returns {string} a representative string
 * @alias module:modeling/geometries/geom2.toString
 *
 * @example
 * console.out(toString(geometry))
 */
export const toString = (geometry: Geom2) => {
	const outlines = toOutlines(geometry);
	let result = "geom2 (" + outlines.size() + " outlines):\n[\n";
	outlines.forEach((outline) => {
		result += "  [" + outline.map(vec2.toString).join(",") + "]\n";
	});
	result += "]\n";
	return result;
};
