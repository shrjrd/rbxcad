import type { Geom3 } from "../types";
import * as poly3 from "../poly3/index";
import { toPolygons } from "./toPolygons";

/**
 * Create a string representing the contents of the given geometry.
 * @param {Geom3} geometry - the geometry
 * @returns {string} a representative string
 * @alias module:modeling/geometries/geom3.toString
 *
 * @example
 * console.out(toString(geometry))
 */
export const toString = (geometry: Geom3) => {
	const polygons = toPolygons(geometry);
	let result = "geom3 (" + polygons.size() + " polygons):\n";
	polygons.forEach((polygon) => {
		result += "  " + poly3.toString(polygon) + "\n";
	});
	return result;
};
