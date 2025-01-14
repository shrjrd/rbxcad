import { Object } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import path2 from "../../geometries/path2";
import flatten from "../../utils/flatten";
import extrudeRectangularGeom2 from "./extrudeRectangularGeom2";
import extrudeRectangularPath2 from "./extrudeRectangularPath2";

/**
 * Extrude the given geometry by following the outline(s) with a rectangle.
 * @See expand for addition options
 * @param {Object} options - options for extrusion, if any
 * @param {Number} [options.size=1] - size of the rectangle
 * @param {Number} [options.height=1] - height of the extrusion
 * @param {...Object} objects - the geometries to extrude
 * @return {Object|Array} the extruded object, or a list of extruded objects
 * @alias module:modeling/extrusions.extrudeRectangular
 *
 * @example
 * let mywalls = extrudeRectangular({size: 1, height: 3}, square({size: 20}))
 * let mywalls = extrudeRectangular({size: 1, height: 300, twistAngle: TAU / 2}, square({size: 20}))
 */
const extrudeRectangular = (
	options: {
		size?: number;
		height?: number;
		twistAngle?: number;
		twistSteps?: number;
		repair?: boolean;
		corners?: "chamfer" | "round";
		segments?: number;
	},
	...objects: (Geom2 | Path2)[]
): Geom3 | Geom3[] => {
	const defaults = {
		size: 1,
		height: 1,
	};
	const { size, height } = Object.assign({}, defaults, options);

	objects = flatten(objects);
	if (objects.size() === 0) error("wrong number of arguments");

	if (size <= 0) error("size must be positive");
	if (height <= 0) error("height must be positive");

	const results = objects.map((object) => {
		if (path2.isA(object)) return extrudeRectangularPath2(options, object as Path2);
		if (geom2.isA(object)) return extrudeRectangularGeom2(options, object as Geom2);
		// if (geom3.isA(object)) return geom3.transform(matrix, object)
		return object;
	}) as Geom3[];
	return results.size() === 1 ? results[0] : results;
};

export default extrudeRectangular;
