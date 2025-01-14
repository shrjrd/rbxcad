import { Error, Object } from "@rbxts/luau-polyfill";

import { isGTE } from "./commonChecks";
import ellipsoid from "./ellipsoid";

type SphereOptions = {
	center?: Vec3;
	radius?: number;
	segments?: number;
	axes?: Vec3[];
};
/**
 * Construct a sphere in three dimensional space where all points are at the same distance from the center.
 * @see [ellipsoid]{@link module:modeling/primitives.ellipsoid} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of sphere
 * @param {Number} [options.radius=1] - radius of sphere
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @param {Array} [options.axes] -  an array with three vectors for the x, y and z base vectors
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.sphere
 *
 * @example
 * let myshape = sphere({radius: 5})
 */
const sphere = (options?: SphereOptions) => {
	const defaults = {
		center: [0, 0, 0],
		radius: 1,
		segments: 32,
		axes: [
			[1, 0, 0],
			[0, -1, 0],
			[0, 0, 1],
		],
	};
	// eslint-disable-next-line prefer-const
	let { center, radius, segments, axes } = Object.assign({}, defaults, options);

	if (!isGTE(radius, 0)) throw new Error("radius must be positive");
	//radius = [radius, radius, radius];
	return ellipsoid({ center, radius: [radius, radius, radius], segments, axes });
};

export default sphere;
