import type { RecursiveArray } from "../../utils/recursiveArray";
import type { Vec3 } from "../../maths/types";
import type { Geometry } from "../../geometries/types";
import type { BoundingBox } from "../../measurements/types";

export interface CenterOptions {
	axes?: [boolean, boolean, boolean];
	relativeTo?: Vec3;
}

import { Array as JsArray, Object } from "@rbxts/luau-polyfill";

import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import * as path2 from "../../geometries/path2/index";
import { measureAggregateBoundingBox } from "../../measurements/measureAggregateBoundingBox";
import { translate } from "./translate";

const centerGeometry = <T extends Geometry>(options: CenterOptions, object: T) => {
	const defaults = {
		axes: [true, true, true],
		relativeTo: [0, 0, 0],
	};
	const { axes, relativeTo } = Object.assign({}, defaults, options);

	const bounds = measureAggregateBoundingBox(object) as BoundingBox;
	const offset: Vec3 = [0, 0, 0];
	if (axes[0]) offset[0] = relativeTo[0] - (bounds[0][0] + (bounds[1][0] - bounds[0][0]) / 2);
	if (axes[1]) offset[1] = relativeTo[1] - (bounds[0][1] + (bounds[1][1] - bounds[0][1]) / 2);
	if (axes[2]) offset[2] = relativeTo[2] - (bounds[0][2] + (bounds[1][2] - bounds[0][2]) / 2);
	return translate(offset, object);
};

/**
 * Center the given objects using the given options.
 * @param {object} options - options for centering
 * @param {Array} [options.axes=[true,true,true]] - axis of which to center, true or false
 * @param {Array} [options.relativeTo=[0,0,0]] - relative point of which to center the objects
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.center
 *
 * @example
 * let myshape = center({axes: [true,false,false]}, sphere()) // center about the X axis
 */
export const center = <T extends Geometry>(options: CenterOptions, ...objects: RecursiveArray<T>) => {
	const defaults = {
		axes: [true, true, true],
		relativeTo: [0, 0, 0],
		// TODO: Add additional 'methods' of centering: midpoint, centroid
	};
	const { axes, relativeTo } = Object.assign({}, defaults, options);

	if (relativeTo.size() !== 3) throw "relativeTo must be an array of length 3";

	options = { axes, relativeTo };

	const results = (objects as Geometry[]).map((object) => {
		if (path2.isA(object)) return centerGeometry(options, object);
		if (geom2.isA(object)) return centerGeometry(options, object);
		if (geom3.isA(object)) return centerGeometry(options, object);
		if (JsArray.isArray(object)) return centerGeometry(options, object);
		return object;
	});
	return results.size() === 1 ? results[0] : results;
};

/**
 * Center the given objects about the X axis.
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.centerX
 */
export const centerX = <T extends Geometry>(...objects: RecursiveArray<T>) =>
	center({ axes: [true, false, false] }, ...objects);

/**
 * Center the given objects about the Y axis.
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.centerY
 */
export const centerY = <T extends Geometry>(...objects: RecursiveArray<T>) =>
	center({ axes: [false, true, false] }, ...objects);

/**
 * Center the given objects about the Z axis.
 * @param {...Object} objects - the objects to center
 * @return {Object|Array} the centered object, or a list of centered objects
 * @alias module:modeling/transforms.centerZ
 */
export const centerZ = <T extends Geometry>(...objects: RecursiveArray<T>) =>
	center({ axes: [false, false, true] }, ...objects);
