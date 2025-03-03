import type { Slice } from "./type";
import { Object } from "@rbxts/luau-polyfill";
/**
 * Create a deep clone of the given slice.
 *
 * @param {Slice} slice - slice to clone
 * @returns {Slice} a new slice
 * @alias module:modeling/geometries/slice.clone
 */
export const clone = (slice: Slice) => Object.assign({}, slice) as Slice;
