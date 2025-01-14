/**
 * Represents a 2D geometry consisting of a list of sides.
 * @see {@link geom2} for data structure information.
 * @module modeling/geometries/geom2
 *
 * @example
 * colorize([0.5,0,1,1], square()) // purple square
 *
 * @example
 * {
 *   "sides": [[[-1,1],[-1,-1]],[[-1,-1],[1,-1]],[[1,-1],[1,1]],[[1,1],[-1,1]]],
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 *   "color": [0.5,0,1,1]
 * }
 */
import clone from "./clone";
import create from "./create";
import fromCompactBinary from "./fromCompactBinary";
import fromPoints from "./fromPoints";
import isA from "./isA";
import reverse from "./reverse";
import toCompactBinary from "./toCompactBinary";
import toOutlines from "./toOutlines";
import toPoints from "./toPoints";
import toSides from "./toSides";
import toString from "./toString";
import transform from "./transform";
import validate from "./validate";

export {
	clone,
	create,
	fromCompactBinary,
	fromPoints,
	isA,
	reverse,
	toCompactBinary,
	toOutlines,
	toPoints,
	toSides,
	toString,
	transform,
	validate,
};

export default {
	clone,
	create,
	fromPoints,
	fromCompactBinary,
	isA,
	reverse,
	toOutlines,
	toPoints,
	toSides,
	toString,
	toCompactBinary,
	transform,
	validate,
};
