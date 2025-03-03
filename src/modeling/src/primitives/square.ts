import type { Vec2 } from "../maths/types";

export interface SquareOptions {
	center?: Vec2;
	size?: number;
}

import { Object } from "@rbxts/luau-polyfill";

import { isGTE } from "./commonChecks";
import { rectangle } from "./rectangle";

/**
 * Construct an axis-aligned square in two dimensional space with four equal sides at right angles.
 * @see [rectangle]{@link module:modeling/primitives.rectangle} for more options
 * @param {object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of square
 * @param {number} [options.size=2] - dimension of square
 * @returns {Geom2} new 2D geometry
 * @alias module:modeling/primitives.square
 *
 * @example
 * let myshape = square({size: 10})
 */
export const square = (options?: SquareOptions) => {
	const defaults = {
		center: [0, 0],
		size: 2,
	};
	// eslint-disable-next-line prefer-const
	let { center, size } = Object.assign({}, defaults, options);

	if (!isGTE(size, 0)) throw "size must be positive";

	//size = [size, size];

	return rectangle({ center, size: [size, size] });
};
