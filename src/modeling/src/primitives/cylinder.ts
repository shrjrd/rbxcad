import { Error, Object } from "@rbxts/luau-polyfill";

import geom3 from "../geometries/geom3";
import { isGTE } from "./commonChecks";
import cylinderElliptic from "./cylinderElliptic";

type CylinderOptions = {
	center?: Vec3;
	height?: number;
	radius?: number;
	segments?: number;
};
/**
 * Construct a Z axis-aligned cylinder in three dimensional space.
 * @see [cylinderElliptic]{@link module:modeling/primitives.cylinderElliptic} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cylinder
 * @param {Number} [options.height=2] - height of cylinder
 * @param {Number} [options.radius=1] - radius of cylinder (at both start and end)
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom3} new geometry
 * @alias module:modeling/primitives.cylinder
 *
 * @example
 * let myshape = cylinder({height: 2, radius: 10})
 */
const cylinder = (options?: CylinderOptions) => {
	const defaults = {
		center: [0, 0, 0],
		height: 2,
		radius: 1,
		segments: 32,
	};
	const { center, height, radius, segments } = Object.assign({}, defaults, options);

	if (!isGTE(radius, 0)) throw new Error("radius must be positive");

	// if size is zero return empty geometry
	if (height === 0 || radius === 0) return geom3.create();

	const newoptions = {
		center,
		height,
		startRadius: [radius, radius] as Vec2,
		endRadius: [radius, radius] as Vec2,
		segments,
	};

	return cylinderElliptic(newoptions);
};

export default cylinder;
export { cylinder };
