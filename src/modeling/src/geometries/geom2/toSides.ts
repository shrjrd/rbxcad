import type { Geom2 } from "../types";
import type { Vec2 } from "../../maths/types";
import { toOutlines } from "./toOutlines";

/**
 * Produces an array of sides from the given geometry.
 * The returned array should not be modified as the data is shared with the geometry.
 * NOTE: The sides returned do NOT define an order. Use toOutlines() for ordered points.
 * @param {Geom2} geometry - the geometry
 * @returns {Array} an array of sides
 * @alias module:modeling/geometries/geom2.toSides
 *
 * @example
 * let sharedSides = toSides(geometry)
 */
export const toSides = (geometry: Geom2) => {
	const sides: Vec2[][] = [];
	toOutlines(geometry).forEach((outline) => {
		outline.forEach((point, i) => {
			const j = (i + 1) % outline.size();
			sides.push([point, outline[j]]);
		});
	});
	return sides;
};
