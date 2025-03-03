import type { Geom3 } from "../../geometries/types";
import type { Vec3 } from "../../maths/types";
import * as geom3 from "../../geometries/geom3/index";
import { hullPoints3 } from "./hullPoints3";
import { toUniquePoints } from "./toUniquePoints";

/**
 * Create a convex hull of the given geom3 geometries.
 *
 * NOTE: The given geometries must be valid geom3 geometries.
 *
 * @param {Geom3[]} geometries - a flat list of 3D geometries
 * @returns {Geom3} new geometry
 */
export const hullGeom3 = (geometries: Geom3[]) => {
	// extract the unique vertices from the geometries
	const unique = toUniquePoints(geometries) as Vec3[];

	if (unique.size() === 0) return geom3.create();

	return geom3.create(hullPoints3(unique));
};
