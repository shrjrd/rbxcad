import { Array } from "@rbxts/luau-polyfill";
/**
 * Determine if the given object is a 2D geometry.
 * @param {Object} object - the object to interrogate
 * @returns {Boolean} true, if the object matches a geom2 based object
 * @alias module:modeling/geometries/geom2.isA
 */
const isA = (object: object) => {
	if (object && typeOf(object) === "table") {
		if ("sides" in object && "transforms" in object) {
			if (Array.isArray(object.sides)) {
				//&& "length" in object.transforms) {
				return true;
			}
		}
	}
	return false;
};

export default isA;
