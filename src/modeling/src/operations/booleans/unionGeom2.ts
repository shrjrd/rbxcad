import type { Geom2 } from "../../geometries/types";
import { boolean } from "./martinez/index";
import { UNION } from "./martinez/operation";

/**
 * Return a new 2D geometry representing the total space in the given 2D geometries.
 * @param {Geom2[]} geometries - a flat list of 2D geometries to union
 * @returns {Geom2} new 2D geometry
 */
export const unionGeom2 = (geometries: Geom2[]) => {
	let newGeometry = geometries.shift()!;
	geometries.forEach((geometry) => {
		newGeometry = boolean(newGeometry, geometry, UNION);
	});

	return newGeometry;
};
