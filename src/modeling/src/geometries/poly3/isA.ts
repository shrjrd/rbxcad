import { Array as JsArray } from "@rbxts/luau-polyfill";

/**
 * Determine if the given object is a polygon.
 * @param {object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a poly3
 * @alias module:modeling/geometries/poly3.isA
 */
export const isA = (object: object) => {
	if (object && typeOf(object) === "table") {
		if ("vertices" in object) {
			if (JsArray.isArray(object.vertices)) {
				return true;
			}
		}
	}
	return false;
};
