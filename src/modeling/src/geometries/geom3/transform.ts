import type { Geom3 } from "../types";
import type { Mat4 } from "../../maths/types";
import { Object } from "@rbxts/luau-polyfill";

import * as mat4 from "../../maths/mat4/index";

/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the polygons, as this function only adjusts the transforms.
 * See applyTransforms() for the actual application of the transforms to the polygons.
 * @param {Mat4} matrix - the matrix to transform with
 * @param {Geom3} geometry - the geometry to transform
 * @returns {Geom3} a new geometry
 * @alias module:modeling/geometries/geom3.transform
 *
 * @example
 * let newGeometry = transform(fromXRotation(TAU / 4), geometry)
 */
export const transform = (matrix: Mat4, geometry: Geom3) => {
	const transforms = mat4.multiply(mat4.create(), matrix, geometry.transforms);
	return Object.assign({}, geometry, { transforms });
};
