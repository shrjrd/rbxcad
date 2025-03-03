import type { RecursiveArray } from "../../utils/recursiveArray";
import type { Geometry, Geom2, Geom3, Path2 } from "../../geometries/types";
import type { Vec3 } from "../../maths/types";

export interface MirrorOptions {
	origin?: Vec3;
	normal?: Vec3;
}

import { Array as JsArray, Number, Object } from "@rbxts/luau-polyfill";

import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import * as path2 from "../../geometries/path2/index";
import * as mat4 from "../../maths/mat4/index";
import * as plane from "../../maths/plane/index";

/**
 * Mirror the given objects using the given options.
 * @param {object} options - options for mirror
 * @param {Array} [options.origin=[0,0,0]] - the origin of the plane
 * @param {Array} [options.normal=[0,0,1]] - the normal vector of the plane
 * @param {...Object} objects - the objects to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirror
 *
 * @example
 * let myshape = mirror({normal: [0,0,10]}, cube({center: [0,0,15], radius: [20, 25, 5]}))
 */
export const mirror = <T extends Geometry>(
	options: MirrorOptions,
	...objects: RecursiveArray<T>
): Geometry[] | Geometry => {
	const defaults = {
		origin: [0, 0, 0],
		normal: [0, 0, 1], // Z axis
	};
	const { origin, normal } = Object.assign({}, defaults, options);

	const planeOfMirror = plane.fromNormalAndPoint(plane.create(), normal, origin);
	// verify the plane, i.e. check that the given normal was valid
	if (Number.isNaN(planeOfMirror[0])) {
		throw "the given origin and normal do not define a proper plane";
	}

	const matrix = mat4.mirrorByPlane(mat4.create(), planeOfMirror);

	const results = objects.map((object) => {
		if (path2.isA(object)) return path2.transform(matrix, object as Path2);
		if (geom2.isA(object)) return geom2.transform(matrix, object as Geom2);
		if (geom3.isA(object)) return geom3.transform(matrix, object as Geom3);
		// handle recursive arrays
		if (JsArray.isArray(object)) return mirror(options, ...object);
		return object;
	});
	return results.size() === 1 ? (results[0] as Geometry) : (results as Geometry[]);
};

/**
 * Mirror the given objects about the X axis.
 * @param {...Object} objects - the objects to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirrorX
 */
export const mirrorX = <T extends Geometry>(...objects: RecursiveArray<T>) => mirror({ normal: [1, 0, 0] }, ...objects);

/**
 * Mirror the given objects about the Y axis.
 * @param {...Object} objects - the geometries to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirrorY
 */
export const mirrorY = <T extends Geometry>(...objects: RecursiveArray<T>) => mirror({ normal: [0, 1, 0] }, ...objects);

/**
 * Mirror the given objects about the Z axis.
 * @param {...Object} objects - the geometries to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirrorZ
 */
export const mirrorZ = <T extends Geometry>(...objects: RecursiveArray<T>) => mirror({ normal: [0, 0, 1] }, ...objects);
