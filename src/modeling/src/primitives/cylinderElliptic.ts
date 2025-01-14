import { Error, Object } from "@rbxts/luau-polyfill";

import geom3 from "../geometries/geom3";
import poly3 from "../geometries/poly3";
import { EPS, TAU } from "../maths/constants";
import { cos, sin } from "../maths/utils/trigonometry";
import vec3 from "../maths/vec3";
import { isGT, isGTE, isNumberArray } from "./commonChecks";

type CylinderEllipticOptions = {
	center?: Vec3;
	height?: number;
	startRadius?: Vec2;
	startAngle?: number;
	endRadius?: Vec2;
	endAngle?: number;
	segments?: number;
};
/**
 * Construct a Z axis-aligned elliptic cylinder in three dimensional space.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cylinder
 * @param {Number} [options.height=2] - height of cylinder
 * @param {Array} [options.startRadius=[1,1]] - radius of rounded start, must be two dimensional array
 * @param {Number} [options.startAngle=0] - start angle of cylinder, in radians
 * @param {Array} [options.endRadius=[1,1]] - radius of rounded end, must be two dimensional array
 * @param {Number} [options.endAngle=TAU] - end angle of cylinder, in radians
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom3} new geometry
 * @alias module:modeling/primitives.cylinderElliptic
 *
 * @example
 * let myshape = cylinderElliptic({height: 2, startRadius: [10,5], endRadius: [8,3]})
 */
const cylinderElliptic = (options?: CylinderEllipticOptions) => {
	const defaults = {
		center: [0, 0, 0],
		height: 2,
		startRadius: [1, 1],
		startAngle: 0,
		endRadius: [1, 1],
		endAngle: TAU,
		segments: 32,
	};
	// eslint-disable-next-line prefer-const
	let { center, height, startRadius, startAngle, endRadius, endAngle, segments } = Object.assign(
		{},
		defaults,
		options,
	);

	if (!isNumberArray(center, 3)) throw new Error("center must be an array of X, Y and Z values");
	if (!isGT(height, 0)) throw new Error("height must be greater then zero");
	if (!isNumberArray(startRadius, 2)) throw new Error("startRadius must be an array of X and Y values");
	if (!startRadius.every((n) => n >= 0)) throw new Error("startRadius values must be positive");
	if (!isNumberArray(endRadius, 2)) throw new Error("endRadius must be an array of X and Y values");
	if (!endRadius.every((n) => n >= 0)) throw new Error("endRadius values must be positive");
	if (endRadius.every((n) => n === 0) && startRadius.every((n) => n === 0))
		throw new Error("at least one radius must be positive");
	if (!isGTE(startAngle, 0)) throw new Error("startAngle must be positive");
	if (!isGTE(endAngle, 0)) throw new Error("endAngle must be positive");
	if (!isGTE(segments, 4)) throw new Error("segments must be four or more");

	startAngle = startAngle % TAU;
	endAngle = endAngle % TAU;

	let rotation = TAU;
	if (startAngle < endAngle) {
		rotation = endAngle - startAngle;
	}
	if (startAngle > endAngle) {
		rotation = endAngle + (TAU - startAngle);
	}

	const minradius = math.min(startRadius[0], startRadius[1], endRadius[0], endRadius[1]);
	const minangle = math.acos(
		(minradius * minradius + minradius * minradius - EPS * EPS) / (2 * minradius * minradius),
	);
	if (rotation < minangle) throw new Error("startAngle and endAngle do not define a significant rotation");

	const slices = math.floor(segments * (rotation / TAU));

	const start = vec3.fromValues(0, 0, -(height / 2));
	const _end = vec3.fromValues(0, 0, height / 2);
	const ray = vec3.subtract(vec3.create(), _end, start);

	const axisX = vec3.fromValues(1, 0, 0);
	const axisY = vec3.fromValues(0, 1, 0);

	const v1 = vec3.create();
	const v2 = vec3.create();
	const v3 = vec3.create();
	const point = (stack: number, slice: number, radius: Vec2) => {
		const angle = slice * rotation + startAngle;
		vec3.scale(v1, axisX, radius[0] * cos(angle));
		vec3.scale(v2, axisY, radius[1] * sin(angle));
		vec3.add(v1, v1, v2);

		vec3.scale(v3, ray, stack);
		vec3.add(v3, v3, start);
		return vec3.add(vec3.create(), v1, v3);
	};

	// adjust the points to center
	const fromPoints = (...points: Vec3[]) => {
		const newpoints = points.map((point) => vec3.add(vec3.create(), point, center));
		return poly3.create(newpoints);
	};

	const polygons = [];
	for (let i = 0; i < slices; i++) {
		const t0 = i / slices;
		let t1 = (i + 1) / slices;
		// fix rounding error when rotating TAU radians
		if (rotation === TAU && i === slices - 1) t1 = 0;

		if (endRadius[0] === startRadius[0] && endRadius[1] === startRadius[1]) {
			polygons.push(fromPoints(start, point(0, t1, endRadius), point(0, t0, endRadius)));
			polygons.push(
				fromPoints(
					point(0, t1, endRadius),
					point(1, t1, endRadius),
					point(1, t0, endRadius),
					point(0, t0, endRadius),
				),
			);
			polygons.push(fromPoints(_end, point(1, t0, endRadius), point(1, t1, endRadius)));
		} else {
			if (startRadius[0] > 0 && startRadius[1] > 0) {
				polygons.push(fromPoints(start, point(0, t1, startRadius), point(0, t0, startRadius)));
			}
			if (startRadius[0] > 0 || startRadius[1] > 0) {
				polygons.push(
					fromPoints(point(0, t0, startRadius), point(0, t1, startRadius), point(1, t0, endRadius)),
				);
			}
			if (endRadius[0] > 0 && endRadius[1] > 0) {
				polygons.push(fromPoints(_end, point(1, t0, endRadius), point(1, t1, endRadius)));
			}
			if (endRadius[0] > 0 || endRadius[1] > 0) {
				polygons.push(fromPoints(point(1, t0, endRadius), point(0, t1, startRadius), point(1, t1, endRadius)));
			}
		}
	}
	if (rotation < TAU) {
		polygons.push(fromPoints(start, point(0, 0, startRadius), _end));
		polygons.push(fromPoints(point(0, 0, startRadius), point(1, 0, endRadius), _end));
		polygons.push(fromPoints(start, _end, point(0, 1, startRadius)));
		polygons.push(fromPoints(point(0, 1, startRadius), _end, point(1, 1, endRadius)));
	}
	const result = geom3.create(polygons);
	return result;
};

export default cylinderElliptic;
