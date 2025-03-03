import { Array as JsArray } from "@rbxts/luau-polyfill";
/**
 * Determine if the given object is a 2D polygon.
 * @param {object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a poly2
 * @alias module:modeling/geometries/poly2.isA
 */
export const isA = (object: object) => {
	if (object && typeOf(object) === "table") {
		if ("points" in object) {
			if (JsArray.isArray(object.points)) {
				return true;
			}
		}
	}
	return false;
};
