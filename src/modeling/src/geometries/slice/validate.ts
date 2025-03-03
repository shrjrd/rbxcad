import type { Slice } from "./type";
import type { Vec3 } from "../../maths/types";
import { Number } from "@rbxts/luau-polyfill";

const Vec3ToString = (v: Vec3) => `[${v[0]},${v[1]},${v[2]}]`;

import * as poly3 from "../../geometries/poly3/index";
import * as plane from "../../maths/plane/index";
import * as vec3 from "../../maths/vec3/index";
import { calculatePlane } from "./calculatePlane";
import { isA } from "./isA";

/**
 * Determine if the given object is a valid slice.
 * Checks for valid data points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/slice.validate
 */
export const validate = (object: Slice) => {
	if (!isA(object)) {
		throw "invalid slice structure";
	}

	const slicePlane = calculatePlane(object);
	object.contours.forEach((contour, i) => {
		if (contour.size() < 3) {
			throw `slice contour ${i} must contain at least 3 vertices`;
		}

		// contours must be coplanar
		const contourPlane = poly3.plane(poly3.create(contour));
		if (!plane.equals(slicePlane, contourPlane)) {
			throw "slice contours must be coplanar";
		}

		for (let i = 0; i < contour.size(); i++) {
			const vertex = contour[i];
			// check for infinity, nan
			if (!vertex.every(Number.isFinite)) {
				throw `slice contour ${i} must contain finite vertices`;
			}

			// check for duplicate points
			const j = (i + 1) % contour.size();
			if (vec3.equals(contour[i], contour[j])) {
				throw `slice contour ${i} has duplicate vertex ${Vec3ToString(contour[i])}`;
			}
		}
	});
};
