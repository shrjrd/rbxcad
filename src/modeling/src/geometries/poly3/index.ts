/**
 * Represents a convex 3D polygon consisting of a list of ordered vertices.
 * @see {@link poly3} for data structure information.
 * @module modeling/geometries/poly3
 *
 * @example
 * poly3.create([[0,0,0], [4,0,0], [4,3,12]])
 *
 * @example
 * {"vertices": [[0,0,0], [4,0,0], [4,3,12]]}
 */
import clone from "./clone";
import create from "./create";
import fromPoints from "./fromPoints";
import fromPointsAndPlane from "./fromPointsAndPlane";
import invert from "./invert";
import isA from "./isA";
import isConvex from "./isConvex";
import measureArea from "./measureArea";
import measureBoundingBox from "./measureBoundingBox";
import measureBoundingSphere from "./measureBoundingSphere";
import measureSignedVolume from "./measureSignedVolume";
import plane from "./plane";
import toPoints from "./toPoints";
import toString from "./toString";
import transform from "./transform";
import validate from "./validate";

export {
	clone,
	create,
	fromPoints,
	fromPointsAndPlane,
	invert,
	isA,
	isConvex,
	measureArea,
	measureBoundingBox,
	measureBoundingSphere,
	measureSignedVolume,
	plane,
	toPoints,
	toString,
	transform,
	validate,
};

export default {
	clone,
	create,
	fromPoints,
	fromPointsAndPlane,
	invert,
	isA,
	isConvex,
	measureArea,
	measureBoundingBox,
	measureBoundingSphere,
	measureSignedVolume,
	plane,
	toPoints,
	toString,
	transform,
	validate,
};
