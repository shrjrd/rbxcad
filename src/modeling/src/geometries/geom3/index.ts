/**
 * Represents a 3D geometry consisting of a list of polygons.
 * @see {@link geom3} for data structure information.
 * @module modeling/geometries/geom3
 *
 * @example
 * colorize([0,0.5,1,0.6], cube()) // transparent ice cube
 *
 * @example
 * {
 *   "polygons": [
 *     {"vertices": [[-1,-1,-1], [-1,-1,1], [-1,1,1], [-1,1,-1]]},
 *     {"vertices": [[1,-1,-1], [1,1,-1], [1,1,1], [1,-1,1]]},
 *     {"vertices": [[-1,-1,-1], [1,-1,-1], [1,-1,1], [-1,-1,1]]},
 *     {"vertices": [[-1,1,-1], [-1,1,1], [1,1,1], [1,1,-1]]},
 *     {"vertices": [[-1,-1,-1], [-1,1,-1], [1,1,-1], [1,-1,-1]]},
 *     {"vertices": [[-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]]}
 *   ],
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 *   "color": [0,0.5,1,0.6]
 * }
 */

import clone from "./clone";
import create from "./create";
import fromCompactBinary from "./fromCompactBinary";
import fromPoints from "./fromPoints";
import fromPointsConvex from "./fromPointsConvex";
import invert from "./invert";
import isA from "./isA";
import toCompactBinary from "./toCompactBinary";
import toPoints from "./toPoints";
import toPolygons from "./toPolygons";
import toString from "./toString";
import transform from "./transform";
import validate from "./validate";

export {
	clone,
	create,
	fromCompactBinary,
	fromPoints,
	fromPointsConvex,
	invert,
	isA,
	toCompactBinary,
	toPoints,
	toPolygons,
	toString,
	transform,
	validate,
};

export default {
	clone,
	create,
	fromPointsConvex,
	fromPoints,
	fromCompactBinary,
	invert,
	isA,
	toPoints,
	toPolygons,
	toString,
	toCompactBinary,
	transform,
	validate,
};
