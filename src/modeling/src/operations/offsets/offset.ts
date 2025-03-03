import type { Geometry, Geom2, Geom3, Path2 } from "../../geometries/types";
import type { RecursiveArray } from "../../utils/recursiveArray";
import type { Corners } from "../../utils/corners";

export interface OffsetOptions {
	delta?: number;
	corners?: "edge" | "chamfer" | "round";
	segments?: number;
	expandHoles?: boolean;
}

import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import * as path2 from "../../geometries/path2/index";
import { offsetGeom2 } from "./offsetGeom2";
import { offsetGeom3 } from "./offsetGeom3";
import { offsetPath2 } from "./offsetPath2";

/**
 * Create offset geometry from the given geometry using the given options.
 * Offsets from internal and external space are created.
 * @param {object} options - options for offset
 * @param {number} [options.delta=1] - delta of offset (+ to exterior, - from interior)
 * @param {string} [options.corners='edge'] - type of corner to create after offseting; edge, chamfer, round
 * @param {number} [options.segments=16] - number of segments when creating round corners
 * @param {...Object} objects - the geometries to offset
 * @return {Object|Array} new geometry, or list of new geometries
 * @alias module:modeling/offsets.offset
 *
 * @example
 * let small = offset({ delta: -4, corners: 'chamfer' }, square({size: 40})) // contract
 */
export const offset = <T extends Geometry>(options: OffsetOptions, ...objects: RecursiveArray<T>) => {
	const results = objects.map((object) => {
		if (path2.isA(object)) return offsetPath2(options, object as Path2);
		if (geom2.isA(object)) return offsetGeom2(options, object as Geom2);
		if (geom3.isA(object)) return offsetGeom3(options, object as Geom3);
		if (JsArray.isArray(object)) return offset(options, ...object);
		return object;
	}) as Geometry[];
	return results.size() === 1 ? results[0] : results;
};
