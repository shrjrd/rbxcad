import type { Vec2 } from "../maths/types";

export interface RoundedRectangleOptions {
	center?: Vec2;
	size?: Vec2;
	roundRadius?: number;
	segments?: number;
}

import { Array as JsArray, Object } from "@rbxts/luau-polyfill";

import * as geom2 from "../geometries/geom2/index";
import { EPS, TAU } from "../maths/constants";
import * as vec2 from "../maths/vec2/index";
import { isGTE, isNumberArray } from "./commonChecks";
import { rectangle } from "./rectangle";

/**
 * Construct an axis-aligned rectangle in two dimensional space with rounded corners.
 * @param {object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of rounded rectangle
 * @param {Array} [options.size=[2,2]] - dimension of rounded rectangle; width and length
 * @param {number} [options.roundRadius=0.2] - round radius of corners
 * @param {number} [options.segments=32] - number of segments to create per full rotation
 * @returns {Geom2} new 2D geometry
 * @alias module:modeling/primitives.roundedRectangle
 *
 * @example
 * let myshape = roundedRectangle({size: [10, 20], roundRadius: 2})
 */
export const roundedRectangle = (options?: RoundedRectangleOptions) => {
	const defaults = {
		center: [0, 0] as Vec2,
		size: [2, 2] as Vec2,
		roundRadius: 0.2,
		segments: 32,
	};
	// eslint-disable-next-line prefer-const
	let { center, size, roundRadius, segments } = Object.assign({}, defaults, options);

	if (!isNumberArray(center, 2)) throw "center must be an array of X and Y values";
	if (!isNumberArray(size, 2)) throw "size must be an array of X and Y values";
	if (!size.every((n) => n >= 0)) throw "size values must be positive";
	if (!isGTE(roundRadius, 0)) throw "roundRadius must be positive";
	if (!isGTE(segments, 4)) throw "segments must be four or more";

	// if any size is zero return empty geometry
	if (size[0] === 0 || size[1] === 0) return geom2.create();

	// if roundRadius is zero, return rectangle
	if (roundRadius === 0) return rectangle({ center, size });

	size = size.map((v) => v / 2) as Vec2; // convert to radius

	if (roundRadius > size[0] - EPS || roundRadius > size[1] - EPS)
		throw "roundRadius must be smaller than the radius of all dimensions";

	const cornerSegments = math.floor(segments / 4);

	// create sets of points that define the corners
	const corner0 = vec2.add(vec2.create(), center, [size[0] - roundRadius, size[1] - roundRadius]);
	const corner1 = vec2.add(vec2.create(), center, [roundRadius - size[0], size[1] - roundRadius]);
	const corner2 = vec2.add(vec2.create(), center, [roundRadius - size[0], roundRadius - size[1]]);
	const corner3 = vec2.add(vec2.create(), center, [size[0] - roundRadius, roundRadius - size[1]]);
	const corner0Points = [];
	const corner1Points = [];
	const corner2Points = [];
	const corner3Points = [];
	for (let i = 0; i <= cornerSegments; i++) {
		const radians = ((TAU / 4) * i) / cornerSegments;
		const point = vec2.fromAngleRadians(vec2.create(), radians);
		vec2.scale(point, point, roundRadius);
		corner0Points.push(vec2.add(vec2.create(), corner0, point));
		vec2.rotate(point, point, vec2.create(), TAU / 4);
		corner1Points.push(vec2.add(vec2.create(), corner1, point));
		vec2.rotate(point, point, vec2.create(), TAU / 4);
		corner2Points.push(vec2.add(vec2.create(), corner2, point));
		vec2.rotate(point, point, vec2.create(), TAU / 4);
		corner3Points.push(vec2.add(vec2.create(), corner3, point));
	}

	const points = JsArray.concat(corner0Points, corner1Points, corner2Points, corner3Points); //corner0Points.concat(corner1Points, corner2Points, corner3Points);
	return geom2.create([points]);
};
