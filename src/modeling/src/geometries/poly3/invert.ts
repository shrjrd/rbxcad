import type { Poly3 } from "./type";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as plane from "../../maths/plane/index";
import { create } from "./create";

/**
 * Invert the give polygon to face the opposite direction.
 *
 * @param {Poly3} polygon - the polygon to invert
 * @returns {Poly3} a new poly3
 * @alias module:modeling/geometries/poly3.invert
 */
export const invert = (polygon: Poly3) => {
	const vertices = JsArray.reverse(JsArray.slice(polygon.vertices)); //polygon.vertices.slice().reverse();
	const inverted = create(vertices);
	if (polygon.plane) {
		// Flip existing plane to save recompute
		inverted.plane = plane.flip(plane.create(), polygon.plane);
	}
	return inverted;
};
