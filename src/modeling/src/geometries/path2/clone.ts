import type { Path2 } from "../types";
import { Object } from "@rbxts/luau-polyfill";
/**
 * Performs a shallow clone of the give geometry.
 * @param {Path2} geometry - the geometry to clone
 * @returns {Path2} a new path
 * @alias module:modeling/geometries/path2.clone
 */
export const clone = (geometry: Path2) => Object.assign({}, geometry) as Path2;
