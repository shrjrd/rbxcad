import type { Vec3 } from "../maths/types";

export interface CubeOptions {
	center?: Vec3;
	size?: number;
}

import { Object } from "@rbxts/luau-polyfill";

import { isGTE } from "./commonChecks";
import { cuboid } from "./cuboid";

/**
 * Construct an axis-aligned solid cube in three dimensional space with six square faces.
 * @see [cuboid]{@link module:modeling/primitives.cuboid} for more options
 * @param {object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cube
 * @param {number} [options.size=2] - dimension of cube
 * @returns {Geom3} new 3D geometry
 * @alias module:modeling/primitives.cube
 * @example
 * let myshape = cube({size: 10})
 */
export const cube = (options?: CubeOptions) => {
	const defaults = {
		center: [0, 0, 0],
		size: 2,
	};
	// eslint-disable-next-line prefer-const
	let { center, size } = Object.assign({}, defaults, options);

	if (!isGTE(size, 0)) throw "size must be positive";

	//size = [size, size, size];

	return cuboid({ center, size: [size, size, size] });
};
