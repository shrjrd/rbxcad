import { Array as JsArray } from "@rbxts/luau-polyfill";
/**
 * Determine if the given object is a 3D geometry.
 * @param {object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a geom3
 * @alias module:modeling/geometries/geom3.isA
 */
export const isA = (object: object) => {
	if (object && typeOf(object) === "table") {
		if ("polygons" in object && "transforms" in object) {
			// DEVIATION: roblox-ts arrays do not have a length property
			//if (JsArray.isArray(object.polygons) && "length" in object.transforms) {
			if (
				JsArray.isArray(object.polygons) &&
				JsArray.isArray(object.transforms) &&
				object.transforms.size() > 0
			) {
				return true;
			}
		}
	}
	return false;
};
