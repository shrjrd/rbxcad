import poly3 from "../poly3";
import toPolygons from "./toPolygons";

/**
 * Create a string representing the contents of the given geometry.
 * @param {geom3} geometry - the geometry
 * @returns {String} a representative string
 * @alias module:modeling/geometries/geom3.toString
 *
 * @example
 * console.out(toString(geometry))
 */
const toString = (geometry: Geom3) => {
	const polygons = toPolygons(geometry);
	let result = "geom3 (" + polygons.size() + " polygons):\n";
	polygons.forEach((polygon) => {
		result += "  " + poly3.toString(polygon) + "\n";
	});
	return result;
};

export default toString;
