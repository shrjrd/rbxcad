import { Error, Number, Object } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import geom3 from "../../geometries/geom3";
import path2 from "../../geometries/path2";
import mat4 from "../../maths/mat4";
import plane from "../../maths/plane";
import flatten from "../../utils/flatten";

type MirrorOptions = {
	origin?: Vec3;
	normal?: Vec3;
};
/**
 * Mirror the given objects using the given options.
 * @param {Object} options - options for mirror
 * @param {Array} [options.origin=[0,0,0]] - the origin of the plane
 * @param {Array} [options.normal=[0,0,1]] - the normal vector of the plane
 * @param {...Object} objects - the objects to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirror
 *
 * @example
 * let myshape = mirror({normal: [0,0,10]}, cube({center: [0,0,15], radius: [20, 25, 5]}))
 */
const mirror = (options: MirrorOptions, ...objects: object[]) => {
	const defaults = {
		origin: [0, 0, 0] as Vec3,
		normal: [0, 0, 1] as Vec3, // Z axis
	};
	const { origin, normal } = Object.assign({}, defaults, options);

	objects = flatten(objects);
	if (objects.size() === 0) throw new Error("wrong number of arguments");

	const planeOfMirror = plane.fromNormalAndPoint(plane.create(), normal, origin);
	// verify the plane, i.e. check that the given normal was valid
	if (Number.isNaN(planeOfMirror[0])) {
		throw new Error("the given origin and normal do not define a proper plane");
	}

	const matrix = mat4.mirrorByPlane(mat4.create(), planeOfMirror);

	const results = objects.map((object) => {
		if (path2.isA(object)) return path2.transform(matrix, object as Path2);
		if (geom2.isA(object)) return geom2.transform(matrix, object as Geom2);
		if (geom3.isA(object)) return geom3.transform(matrix, object as Geom3);
		return object;
	});
	return results.size() === 1 ? results[0] : results;
};

/**
 * Mirror the given objects about the X axis.
 * @param {...Object} objects - the objects to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirrorX
 */
const mirrorX = (...objects: object[]) => mirror({ normal: [1, 0, 0] }, objects);

/**
 * Mirror the given objects about the Y axis.
 * @param {...Object} objects - the geometries to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirrorY
 */
const mirrorY = (...objects: object[]) => mirror({ normal: [0, 1, 0] }, objects);

/**
 * Mirror the given objects about the Z axis.
 * @param {...Object} objects - the geometries to mirror
 * @return {Object|Array} the mirrored object, or a list of mirrored objects
 * @alias module:modeling/transforms.mirrorZ
 */
const mirrorZ = (...objects: object[]) => mirror({ normal: [0, 0, 1] }, objects);

export default {
	mirror,
	mirrorX,
	mirrorY,
	mirrorZ,
};

export { mirror, mirrorX, mirrorY, mirrorZ };
