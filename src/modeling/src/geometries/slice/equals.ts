import type { Slice } from "./type";
import type { Vec3 } from "../../maths/types";
import * as vec3 from "../../maths/vec3/index";

/**
 * Determine if the given slices have the same contours.
 * @param {Slice} a - the first slice to compare
 * @param {Slice} b - the second slice to compare
 * @returns {Boolean} true if the slices are equal
 * @alias module:modeling/geometries/slice.equals
 */
export const equals = (a: Slice, b: Slice) => {
	if (a.contours.size() !== b.contours.size()) {
		return false;
	}

	const len = a.contours.size();
	for (let i = 0; i < len; i++) {
		const aVertex = a.contours[i];
		for (let j = 0; j < len; j++) {
			const bVertex = b.contours[j];
			if (!vec3.equals(aVertex as unknown as Vec3, bVertex as unknown as Vec3)) {
				return false;
			}
		}
	}

	return true;
};
