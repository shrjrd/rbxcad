import { Error, Object } from "@rbxts/luau-polyfill";

import geom3 from "../geometries/geom3";
import poly3 from "../geometries/poly3";
import { isNumberArray } from "./commonChecks";

type CuboidOptions = {
	center?: Vec3;
	size?: Vec3;
};
/**
 * Construct an axis-aligned solid cuboid in three dimensional space.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cuboid
 * @param {Array} [options.size=[2,2,2]] - dimensions of cuboid; width, depth, height
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.cuboid
 *
 * @example
 * let myshape = cuboid({size: [5, 10, 5]})
 */
const cuboid = (options?: CuboidOptions) => {
	const defaults = {
		center: [0, 0, 0],
		size: [2, 2, 2],
	};
	const { center, size } = Object.assign({}, defaults, options);

	if (!isNumberArray(center, 3)) throw new Error("center must be an array of X, Y and Z values");
	if (!isNumberArray(size, 3)) throw new Error("size must be an array of width, depth and height values");
	if (!size.every((n) => n >= 0)) throw new Error("size values must be positive");

	// if any size is zero return empty geometry
	if (size[0] === 0 || size[1] === 0 || size[2] === 0) return geom3.create();

	const result = geom3.create(
		// adjust a basic shape to size
		[
			[
				[0, 4, 6, 2],
				[-1, 0, 0],
			],
			[
				[1, 3, 7, 5],
				[1, 0, 0],
			],
			[
				[0, 1, 5, 4],
				[0, -1, 0],
			],
			[
				[2, 6, 7, 3],
				[0, 1, 0],
			],
			[
				[0, 2, 3, 1],
				[0, 0, -1],
			],
			[
				[4, 5, 7, 6],
				[0, 0, 1],
			],
		].map((info) => {
			const points = info[0].map((i) => {
				const pos = [
					//center[0] + (size[0] / 2) * (2 * !!(i & 1) - 1),
					//center[1] + (size[1] / 2) * (2 * !!(i & 2) - 1),
					//center[2] + (size[2] / 2) * (2 * !!(i & 4) - 1),
					center[0] + (size[0] / 2) * (2 * (bit32.band(i, 1) !== 0 ? 1 : 0) - 1),
					center[1] + (size[1] / 2) * (2 * (bit32.band(i, 2) !== 0 ? 1 : 0) - 1),
					center[2] + (size[2] / 2) * (2 * (bit32.band(i, 4) !== 0 ? 1 : 0) - 1),
				];
				return pos;
			});
			return poly3.create(points as Vec3[]);
		}),
	);
	return result;
};

export default cuboid;
export { cuboid };
