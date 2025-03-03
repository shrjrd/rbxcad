import type { Poly2 } from "../types";
import { Object } from "@rbxts/luau-polyfill";
/**
 * Create a shallow clone of the given polygon.
 *
 * @param {Poly2} polygon - polygon to clone
 * @returns {Poly2} a new polygon
 * @alias module:modeling/geometries/poly2.clone
 */
export const clone = (polygon: Poly2): Poly2 => Object.assign({}, polygon);
