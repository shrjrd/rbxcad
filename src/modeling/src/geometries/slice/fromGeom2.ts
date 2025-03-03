import type { Geom2 } from "../types";
import * as vec3 from "../../maths/vec3/index";
import { toOutlines } from "../geom2/index";
import { create } from "./create";

/**
 * Create a slice from a geom2.
 *
 * @param {object} geometry - the 2D geometry to create a slice from
 * @returns {Slice} a new slice
 * @alias module:modeling/geometries/slice.fromGeom2
 */
export const fromGeom2 = (geometry: Geom2) => {
	// Convert from 2D points to 3D vertices
	const contours = toOutlines(geometry).map((outline) => outline.map((point) => vec3.fromVec2(vec3.create(), point)));
	return create(contours);
};
