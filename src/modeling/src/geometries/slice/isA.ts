import { Array as JsArray } from "@rbxts/luau-polyfill";
/**
 * Determine if the given object is a slice.
 * @param {Slice} object - the object to interrogate
 * @returns {Boolean} true if the object matches a slice
 * @alias module:modeling/geometries/slice.isA
 */
export const isA = (object: object) => {
	if (object && typeOf(object) === "table") {
		if ("contours" in object) {
			if (JsArray.isArray(object.contours)) {
				return true;
			}
		}
	}
	return false;
};
