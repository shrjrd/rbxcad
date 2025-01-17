import { Object } from "@rbxts/luau-polyfill";
/**
 * Performs a shallow clone of the given geometry.
 * @param {geom3} geometry - the geometry to clone
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.clone
 */
const clone = (geometry: Geom3) => Object.assign({}, geometry);

export default clone;
