import type { Mat4, Vec2 } from "../../maths/types";
import type { Poly2 } from "./type";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as mat4 from "../../maths/mat4/index";
import * as vec2 from "../../maths/vec2/index";
import { create } from "./create";

/**
 * Transform the given polygon using the given matrix.
 * @param {Mat4} matrix - the matrix to transform with
 * @param {Poly2} polygon - the polygon to transform
 * @returns {Poly2} a new polygon
 * @alias module:modeling/geometries/poly2.transform
 */
export const transform = (matrix: Mat4, polygon: Poly2) => {
	const points = polygon.points.map((point: Vec2) => vec2.transform(vec2.create(), point, matrix));
	if (mat4.isMirroring(matrix)) {
		// reverse the order to preserve the orientation
		JsArray.reverse(points); //points.reverse();
	}
	return create(points);
};
