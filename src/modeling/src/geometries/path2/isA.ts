import { Array } from "@rbxts/luau-polyfill";
/**
 * Determine if the given object is a path2 geometry.
 * @param {Object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a path2
 * @alias module:modeling/geometries/path2.isA
 */
const isA = (object?: object) => {
	if (object && typeOf(object) === "table") {
		// see create for the required attributes and types
		if ("points" in object && "transforms" in object && "isClosed" in object) {
			// NOTE: transforms should be a TypedArray, which has a read-only length
			if (Array.isArray(object.points)) {
				//&& "length" in object.transforms) {
				return true;
			}
		}
	}
	return false;
};

export default isA;
