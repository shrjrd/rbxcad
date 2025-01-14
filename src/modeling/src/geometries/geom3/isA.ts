import { Array } from "@rbxts/luau-polyfill";
/**
 * Determine if the given object is a 3D geometry.
 * @param {Object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a geom3
 * @alias module:modeling/geometries/geom3.isA
 */
const isA = (object: object) => {
	if (object && typeOf(object) === "table") {
		if ("polygons" in object && "transforms" in object) {
			if (Array.isArray(object.polygons)) {
				// && "length" in object.transforms) {
				return true;
			}
		}
	}
	return false;
};

export default isA;
