import type { Vec2 } from "../maths/types";

export interface RectangleOptions {
	center?: Vec2;
	size?: Vec2;
}

import { Object } from "@rbxts/luau-polyfill";

import * as geom2 from "../geometries/geom2/index";
import * as vec2 from "../maths/vec2/index";
import { isNumberArray } from "./commonChecks";

/**
 * Construct an axis-aligned rectangle in two dimensional space with four sides at right angles.
 * @param {object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of rectangle
 * @param {Array} [options.size=[2,2]] - dimension of rectangle, width and length
 * @returns {Geom2} new 2D geometry
 * @alias module:modeling/primitives.rectangle
 *
 * @example
 * let myshape = rectangle({size: [10, 20]})
 */
export const rectangle = (options?: RectangleOptions) => {
	const defaults = {
		center: [0, 0] as Vec2,
		size: [2, 2] as Vec2,
	};
	const { center, size } = Object.assign({}, defaults, options);

	if (!isNumberArray(center, 2)) throw "center must be an array of X and Y values";
	if (!isNumberArray(size, 2)) throw "size must be an array of X and Y values";
	if (!size.every((n) => n >= 0)) throw "size values must be positive";

	// if any size is zero return empty geometry
	if (size[0] === 0 || size[1] === 0) return geom2.create();

	const point: Vec2 = [size[0] / 2, size[1] / 2];
	const swapped: Vec2 = [point[0], -point[1]];

	const points = [
		vec2.subtract(vec2.create(), center, point),
		vec2.add(vec2.create(), center, swapped),
		vec2.add(vec2.create(), center, point),
		vec2.subtract(vec2.create(), center, swapped),
	];
	return geom2.create([points]);
};
