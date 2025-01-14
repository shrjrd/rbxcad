import { Object } from "@rbxts/luau-polyfill";
/**
 * Performs a shallow clone of the given geometry.
 * @param {geom2} geometry - the geometry to clone
 * @returns {geom2} new geometry
 * @alias module:modeling/geometries/geom2.clone
 */
const clone = (geometry: Geom2): Geom2 => Object.assign({}, geometry);

export default clone;
