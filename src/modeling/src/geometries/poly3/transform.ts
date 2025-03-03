import type { Mat4, Vec3 } from "../../maths/types";
import type { Poly3 } from "./type";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as mat4 from "../../maths/mat4/index";
import * as vec3 from "../../maths/vec3/index";
import { create } from "./create";

/**
 * Transform the given polygon using the given matrix.
 * @param {Mat4} matrix - the matrix to transform with
 * @param {Poly3} polygon - the polygon to transform
 * @returns {Poly3} a new polygon
 * @alias module:modeling/geometries/poly3.transform
 */
export const transform = (matrix: Mat4, polygon: Poly3) => {
	const vertices = polygon.vertices.map((vertex: Vec3) => vec3.transform(vec3.create(), vertex, matrix));
	if (mat4.isMirroring(matrix)) {
		// reverse the order to preserve the orientation
		JsArray.reverse(vertices); //vertices.reverse();
	}
	return create(vertices);
};
