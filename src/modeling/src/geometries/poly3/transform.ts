import { Array } from "@rbxts/luau-polyfill";

import mat4 from "../../maths/mat4";
import vec3 from "../../maths/vec3";
import create from "./create";

/**
 * Transform the given polygon using the given matrix.
 * @param {mat4} matrix - the matrix to transform with
 * @param {poly3} polygon - the polygon to transform
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometries/poly3.transform
 */
const transform = (matrix: Mat4, polygon: Poly3) => {
	const vertices = polygon.vertices.map((vertex) => vec3.transform(vec3.create(), vertex, matrix));
	if (mat4.isMirroring(matrix)) {
		// reverse the order to preserve the orientation
		Array.reverse(vertices); //vertices.reverse();
	}
	return create(vertices);
};

export default transform;
