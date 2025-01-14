/**
 * Represents a 2D geometry consisting of a list of ordered points.
 * @see {@link path2} for data structure information.
 * @module modeling/geometries/path2
 *
 * @example
 * colorize([0,0,0,1], path2.fromPoints({ closed: true }, [[0,0], [4,0], [4,3]]))
 *
 * @example
 * {
 *   "points": [[0,0], [4,0], [4,3]],
 *   "isClosed": true,
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 *   "color": [0,0,0,1]
 * }
 */
import appendArc from "./appendArc";
import appendBezier from "./appendBezier";
import appendPoints from "./appendPoints";
import clone from "./clone";
import close from "./close";
import concat from "./concat";
import create from "./create";
import equals from "./equals";
import fromCompactBinary from "./fromCompactBinary";
import fromPoints from "./fromPoints";
import isA from "./isA";
import reverse from "./reverse";
import toCompactBinary from "./toCompactBinary";
import toPoints from "./toPoints";
import toString from "./toString";
import transform from "./transform";
import validate from "./validate";

export {
	appendArc,
	appendBezier,
	appendPoints,
	clone,
	close,
	concat,
	create,
	equals,
	fromCompactBinary,
	fromPoints,
	isA,
	reverse,
	toCompactBinary,
	toPoints,
	toString,
	transform,
	validate,
};

export default {
	appendArc,
	appendBezier,
	appendPoints,
	clone,
	close,
	concat,
	create,
	equals,
	fromPoints,
	fromCompactBinary,
	isA,
	reverse,
	toPoints,
	toString,
	toCompactBinary,
	transform,
	validate,
};
