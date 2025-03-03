import type { Geometry, Geom2, Geom3, Path2 } from "../../geometries/types";
import type { Vec3 } from "../../maths/types";
import type { RecursiveArray } from "../../utils/recursiveArray";

export interface ExtrudeLinearOptions {
	height?: number;
	twistAngle?: number;
	twistSteps?: number;
}

import { Array as JsArray, Object } from "@rbxts/luau-polyfill";

import * as geom2 from "../../geometries/geom2/index";
import * as path2 from "../../geometries/path2/index";
import { extrudeLinearGeom2 } from "./extrudeLinearGeom2";
import { extrudeLinearPath2 } from "./extrudeLinearPath2";

/**
 * Extrude the given geometry in an upward linear direction using the given options.
 * Accepts path2 or geom2 objects as input. Paths must be closed.
 *
 * @param {object} options - options for extrude
 * @param {number} [options.height=1] the height of the extrusion
 * @param {number} [options.twistAngle=0] the final rotation (RADIANS) about the origin of the shape (if any)
 * @param {number} [options.twistSteps=1] the resolution of the twist about the axis (if any)
 * @param {...Object} objects - the geometries to extrude
 * @return {Object|Array} the extruded geometry, or a list of extruded geometry
 * @alias module:modeling/extrusions.extrudeLinear
 *
 * @example
 * let myshape = extrudeLinear({height: 10}, rectangle({size: [20, 25]}))
 */
export const extrudeLinear = (options: ExtrudeLinearOptions, ...objects: RecursiveArray<Geometry>) => {
	const defaults = {
		height: 1,
		twistAngle: 0,
		twistSteps: 1,
		repair: true,
	};
	const { height, twistAngle, twistSteps, repair } = Object.assign({}, defaults, options);

	options = { offset: [0, 0, height], twistAngle, twistSteps, repair } as ExtrudeLinearOptions;

	const results = objects.map((object) => {
		if (path2.isA(object)) return extrudeLinearPath2(options, object as Path2);
		if (geom2.isA(object)) return extrudeLinearGeom2(options, object as Geom2);
		// if (geom3.isA(object)) return geom3.extrude(options, object)
		if (JsArray.isArray(object)) return extrudeLinear(options, ...object);
		return object;
	}) as Geom3[];
	return results.size() === 1 ? results[0] : results;
};
