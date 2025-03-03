import type { Vec2, Vec3 } from "../maths/types";

export interface CylinderOptions {
	center?: Vec3;
	height?: number;
	radius?: number;
	segments?: number;
}

import { Object } from "@rbxts/luau-polyfill";

import * as geom3 from "../geometries/geom3/index";
import { isGTE } from "./commonChecks";
import { cylinderElliptic } from "./cylinderElliptic";

/**
 * Construct a Z axis-aligned cylinder in three dimensional space.
 * @see [cylinderElliptic]{@link module:modeling/primitives.cylinderElliptic} for more options
 * @param {object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cylinder
 * @param {number} [options.height=2] - height of cylinder
 * @param {number} [options.radius=1] - radius of cylinder (at both start and end)
 * @param {number} [options.segments=32] - number of segments to create per full rotation
 * @returns {Geom3} new geometry
 * @alias module:modeling/primitives.cylinder
 *
 * @example
 * let myshape = cylinder({height: 2, radius: 10})
 */
export const cylinder = (options?: CylinderOptions) => {
	const defaults = {
		center: [0, 0, 0] as Vec3,
		height: 2,
		radius: 1,
		segments: 32,
	};
	const { center, height, radius, segments } = Object.assign({}, defaults, options);

	if (!isGTE(radius, 0)) throw "radius must be positive";

	// if size is zero return empty geometry
	if (height === 0 || radius === 0) return geom3.create();

	const newOptions = {
		center,
		height,
		startRadius: [radius, radius] as [number, number],
		endRadius: [radius, radius] as [number, number],
		segments,
	};

	return cylinderElliptic(newOptions);
};
