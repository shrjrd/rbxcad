import type { Path2 } from "../../geometries/types";
import type { Vec2 } from "../../maths/types";
import * as path2 from "../../geometries/path2/index";
import { hullPoints2 } from "./hullPoints2";
import { toUniquePoints } from "./toUniquePoints";

/**
 * Create a convex hull of the given path2 geometries.
 *
 * NOTE: The given geometries must be valid path2 geometry.
 *
 * @param {Path2[]} geometries - a flat list of path2 geometries
 * @returns {Path2} new geometry
 */
export const hullPath2 = (geometries: Path2[]) => {
	// extract the unique points from the geometries
	const unique = toUniquePoints(geometries) as Vec2[];

	const hullPoints = hullPoints2(unique);

	// assemble a new geometry from the list of points
	return path2.fromPoints({ closed: true }, hullPoints);
};
