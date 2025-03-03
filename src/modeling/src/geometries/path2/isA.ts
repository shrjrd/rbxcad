import { Array as JsArray } from "@rbxts/luau-polyfill";
/**
 * Determine if the given object is a path2 geometry.
 * @param {object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a path2
 * @alias module:modeling/geometries/path2.isA
 */
export const isA = (object?: object) => {
	//if (object && typeof object === "object") {
	if (object && typeOf(object) === "table") {
		// see create for the required attributes and types
		if ("points" in object && "transforms" in object && "isClosed" in object) {
			// NOTE: transforms should be a TypedArray, which has a read-only length
			// DEVIATION: roblox-ts arrays do not have a length property
			//if (JsArray.isArray(object.points) && "length" in (object.transforms as number[])) {
			if (JsArray.isArray(object.points) && JsArray.isArray(object.transforms) && object.transforms.size() > 0) {
				return true;
			}
		}
	}
	return false;
};
