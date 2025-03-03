import type { Geom2 } from "../types";
import type { Vec2 } from "../../maths/types";
import { toOutlines } from "./toOutlines";

/**
 * Produces an array of points from the given geometry.
 * The returned array should not be modified as the points are shared with the geometry.
 * NOTE: The points returned do NOT define an order. Use toOutlines() for ordered points.
 * @param {Geom2} geometry - the geometry
 * @returns {Array} an array of points
 * @alias module:modeling/geometries/geom2.toPoints
 *
 * @example
 * let sharedPoints = toPoints(geometry)
 */
export const toPoints = (geometry: Geom2) => {
	const points: Vec2[] = [];
	toOutlines(geometry).forEach((outline) => {
		outline.forEach((point) => {
			points.push(point);
		});
	});
	return points;
};
