import type { Geom2 } from "../types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import { create } from "./create";
import { toOutlines } from "./toOutlines";

/**
 * Reverses the given geometry so that the outline points are flipped in the opposite order.
 * This swaps the left (interior) and right (exterior) edges.
 * @param {Geom2} geometry - the geometry to reverse
 * @returns {Geom2} the new reversed geometry
 * @alias module:modeling/geometries/geom2.reverse
 *
 * @example
 * let newGeometry = reverse(geometry)
 */
export const reverse = (geometry: Geom2) => {
	const outlines = toOutlines(geometry).map((outline) => JsArray.reverse(JsArray.slice(outline))); //outline.slice().reverse());
	const reversed = create(outlines);
	if (geometry.color) reversed.color = geometry.color;
	return reversed;
};
