import type { Geom3 } from "../types";
import { Object } from "@rbxts/luau-polyfill";
/**
 * Performs a shallow clone of the given geometry.
 * @param {Geom3} geometry - the geometry to clone
 * @returns {Geom3} a new geometry
 * @alias module:modeling/geometries/geom3.clone
 */
export const clone = (geometry: Geom3) => Object.assign({}, geometry);
