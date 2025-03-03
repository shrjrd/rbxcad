import type { Geom3 } from "../../geometries/types";
import { retessellate } from "../modifiers/retessellate";
import { subtractGeom3Sub } from "./subtractGeom3Sub";

/**
 * Return a new 3D geometry representing space in this geometry but not in the given geometries.
 * Neither this geometry nor the given geometries are modified.
 * @param {Geom3[]} geometries - a flat list of 3D geometries
 * @returns {Geom3} new 3D geometry
 */
export const subtractGeom3 = (geometries: Geom3[]) => {
	let newGeometry = geometries.shift()!;
	geometries.forEach((geometry) => {
		newGeometry = subtractGeom3Sub(newGeometry, geometry);
	});

	newGeometry = retessellate(newGeometry);
	return newGeometry;
};
