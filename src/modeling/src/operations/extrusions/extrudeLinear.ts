import { Error, Object } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import path2 from "../../geometries/path2";
import flatten from "../../utils/flatten";
import extrudeLinearGeom2 from "./extrudeLinearGeom2";
import extrudeLinearPath2 from "./extrudeLinearPath2";

/**
 * Extrude the given geometry in an upward linear direction using the given options.
 * Accepts path2 or geom2 objects as input. Paths must be closed.
 *
 * @param {Object} options - options for extrude
 * @param {Number} [options.height=1] the height of the extrusion
 * @param {Number} [options.twistAngle=0] the final rotation (RADIANS) about the origin of the shape (if any)
 * @param {Integer} [options.twistSteps=1] the resolution of the twist about the axis (if any)
 * @param {...Object} objects - the geometries to extrude
 * @return {Object|Array} the extruded geometry, or a list of extruded geometry
 * @alias module:modeling/extrusions.extrudeLinear
 *
 * @example
 * let myshape = extrudeLinear({height: 10}, rectangle({size: [20, 25]}))
 */
const extrudeLinear = (
	options: {
		height?: number;
		twistAngle?: number;
		twistSteps?: number;
		repair?: boolean;
		offset?: Vec3;
	},
	...objects: (Geom2 | Path2)[]
) => {
	const defaults = {
		height: 1,
		twistAngle: 0,
		twistSteps: 1,
		repair: true,
	};
	const { height, twistAngle, twistSteps, repair } = Object.assign({}, defaults, options);

	objects = flatten(objects);
	if (objects.size() === 0) throw new Error("wrong number of arguments");

	options = { offset: [0, 0, height], twistAngle, twistSteps, repair };

	const results = objects.map((object) => {
		if (path2.isA(object)) return extrudeLinearPath2(options, object as Path2);
		if (geom2.isA(object)) return extrudeLinearGeom2(options, object as Geom2);
		// if (geom3.isA(object)) return geom3.extrude(options, object)
		return object;
	}) as Geom3[];
	return results.size() === 1 ? results[0] : results;
};

export default extrudeLinear;
