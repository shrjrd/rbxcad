import { Error, Object } from "@rbxts/luau-polyfill";

import { TAU } from "../maths/constants";
import { isGTE } from "./commonChecks";
import ellipse from "./ellipse";

type CircleOptions = {
	center?: Vec2;
	radius?: number;
	startAngle?: number;
	endAngle?: number;
	segments?: number;
	size?: number;
};
/**
 * Construct a circle in two dimensional space where all points are at the same distance from the center.
 * @see [ellipse]{@link module:modeling/primitives.ellipse} for more options
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of circle
 * @param {Number} [options.radius=1] - radius of circle
 * @param {Number} [options.startAngle=0] - start angle of circle, in radians
 * @param {Number} [options.endAngle=TAU] - end angle of circle, in radians
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.circle
 * @example
 * let myshape = circle({radius: 10})
 */
const circle = (options?: CircleOptions) => {
	const defaults = {
		center: [0, 0],
		radius: 1,
		startAngle: 0,
		endAngle: TAU,
		segments: 32,
	};
	// eslint-disable-next-line prefer-const
	let { center, radius, startAngle, endAngle, segments } = Object.assign({}, defaults, options);

	if (!isGTE(radius, 0)) throw new Error("radius must be positive");

	return ellipse({ center, radius: [radius, radius], startAngle, endAngle, segments });
};

export default circle;
