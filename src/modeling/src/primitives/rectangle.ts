import { Error, Object } from "@rbxts/luau-polyfill";

import geom2 from "../geometries/geom2";
import vec2 from "../maths/vec2";
import { isNumberArray } from "./commonChecks";

type RectangleOptions = {
	center?: Vec2;
	size?: Vec2;
};
/**
 * Construct an axis-aligned rectangle in two dimensional space with four sides at right angles.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of rectangle
 * @param {Array} [options.size=[2,2]] - dimension of rectangle, width and length
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.rectangle
 *
 * @example
 * let myshape = rectangle({size: [10, 20]})
 */
const rectangle = (options?: RectangleOptions) => {
	const defaults = {
		center: [0, 0] as Vec2,
		size: [2, 2] as Vec2,
	};
	const { center, size } = Object.assign({}, defaults, options);

	if (!isNumberArray(center, 2)) throw new Error("center must be an array of X and Y values");
	if (!isNumberArray(size, 2)) throw new Error("size must be an array of X and Y values");
	if (!size.every((n) => n >= 0)) throw new Error("size values must be positive");

	// if any size is zero return empty geometry
	if (size[0] === 0 || size[1] === 0) return geom2.create();

	const point: Vec2 = [size[0] / 2, size[1] / 2];
	const pswap: Vec2 = [point[0], -point[1]];

	const points = [
		vec2.subtract(vec2.create(), center, point),
		vec2.add(vec2.create(), center, pswap),
		vec2.add(vec2.create(), center, point),
		vec2.subtract(vec2.create(), center, pswap),
	];
	return geom2.fromPoints(points);
};

export default rectangle;
