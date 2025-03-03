import type { Geom2 } from "../../geometries/types";
import type { Vec2 } from "../../maths/types";
import * as geom2 from "../../geometries/geom2/index";
import { hullPoints2 } from "./hullPoints2";
import { toUniquePoints } from "./toUniquePoints";

/**
 * Create a convex hull of the given geom2 geometries.
 *
 * NOTE: The given geometries must be valid geom2 geometries.
 *
 * @param {Geom2[]} geometries - a flat list of 2D geometries
 * @returns {Geom2} new geometry
 */
export const hullGeom2 = (geometries: Geom2[]) => {
	// extract the unique points from the geometries
	const unique = toUniquePoints(geometries) as Vec2[];

	const hullPoints = hullPoints2(unique);

	// NOTE: more than three points are required to create a new geometry
	if (hullPoints.size() < 3) return geom2.create();

	// assemble a new geometry from the list of points
	return geom2.create([hullPoints]);
};
