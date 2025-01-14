/**
 * Represents a plane in 3D coordinate space as determined by a normal (perpendicular to the plane)
 * and distance from 0,0,0.
 * @see {@link plane} for data structure information.
 * @module modeling/maths/plane
 */

import { clone, copy, create, equals, fromValues, toString } from "../vec4";
import flip from "./flip";
import fromNoisyPoints from "./fromNoisyPoints";
import fromNormalAndPoint from "./fromNormalAndPoint";
import fromPoints from "./fromPoints";
import fromPointsRandom from "./fromPointsRandom";
import projectionOfPoint from "./projectionOfPoint";
import signedDistanceToPoint from "./signedDistanceToPoint";
import transform from "./transform";

export {
	clone,
	copy,
	create,
	equals,
	flip,
	fromNoisyPoints,
	fromNormalAndPoint,
	fromPoints,
	fromPointsRandom,
	fromValues,
	projectionOfPoint,
	signedDistanceToPoint,
	toString,
	transform,
};

export default {
	clone,
	copy,
	create,
	equals,
	flip,
	fromNoisyPoints,
	fromNormalAndPoint,
	fromPoints,
	fromPointsRandom,
	fromValues,
	projectionOfPoint,
	signedDistanceToPoint,
	toString,
	transform,
};
