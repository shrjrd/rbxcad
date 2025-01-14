import { Array as JsArray, Error, Object } from "@rbxts/luau-polyfill";

import geom3 from "../geometries/geom3";
import poly3 from "../geometries/poly3";
import { EPS, TAU } from "../maths/constants";
import { cos, sin } from "../maths/utils/trigonometry";
import vec3 from "../maths/vec3";
import { isGTE, isNumberArray } from "./commonChecks";
import cylinder from "./cylinder";

type RoundedCylinderOptions = {
	center?: Vec3;
	height?: number;
	radius?: number;
	roundRadius?: number;
	segments?: number;
};
/**
 * Construct a Z axis-aligned solid cylinder in three dimensional space with rounded ends.
 * @param {Object} [options] - options for construction
 * @param {Array} [options.center=[0,0,0]] - center of cylinder
 * @param {Number} [options.height=2] - height of cylinder
 * @param {Number} [options.radius=1] - radius of cylinder
 * @param {Number} [options.roundRadius=0.2] - radius of rounded edges
 * @param {Number} [options.segments=32] - number of segments to create per full rotation
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.roundedCylinder
 *
 * @example
 * let myshape = roundedCylinder({ height: 10, radius: 2, roundRadius: 0.5 })
 */
const roundedCylinder = (options?: RoundedCylinderOptions) => {
	const defaults = {
		center: [0, 0, 0],
		height: 2,
		radius: 1,
		roundRadius: 0.2,
		segments: 32,
	};
	const { center, height, radius, roundRadius, segments } = Object.assign({}, defaults, options);

	if (!isNumberArray(center, 3)) throw new Error("center must be an array of X, Y and Z values");
	if (!isGTE(height, 0)) throw new Error("height must be positive");
	if (!isGTE(radius, 0)) throw new Error("radius must be positive");
	if (!isGTE(roundRadius, 0)) throw new Error("roundRadius must be positive");
	if (roundRadius > radius) throw new Error("roundRadius must be smaller than the radius");
	if (!isGTE(segments, 4)) throw new Error("segments must be four or more");

	// if size is zero return empty geometry
	if (height === 0 || radius === 0) return geom3.create();

	// if roundRadius is zero, return cylinder
	if (roundRadius === 0) return cylinder({ center, height, radius });

	const start: Vec3 = [0, 0, -(height / 2)];
	const _end: Vec3 = [0, 0, height / 2];
	const direction = vec3.subtract(vec3.create(), _end, start);
	const length = vec3.length(direction);

	if (2 * roundRadius > length - EPS) throw new Error("height must be larger than twice roundRadius");

	let defaultnormal;
	if (math.abs(direction[0]) > math.abs(direction[1])) {
		defaultnormal = vec3.fromValues(0, 1, 0);
	} else {
		defaultnormal = vec3.fromValues(1, 0, 0);
	}

	const zvector = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), direction), roundRadius);
	const xvector = vec3.scale(
		vec3.create(),
		vec3.normalize(vec3.create(), vec3.cross(vec3.create(), zvector, defaultnormal)),
		radius,
	);
	const yvector = vec3.scale(
		vec3.create(),
		vec3.normalize(vec3.create(), vec3.cross(vec3.create(), xvector, zvector)),
		radius,
	);

	vec3.add(start, start, zvector);
	vec3.subtract(_end, _end, zvector);

	const qsegments = math.floor(0.25 * segments);

	const fromPoints = (points: Vec3[]) => {
		// adjust the points to center
		const newpoints = points.map((point) => vec3.add(point, point, center));
		return poly3.create(newpoints);
	};

	const polygons = [];
	const v1 = vec3.create();
	const v2 = vec3.create();
	let prevcylinderpoint;
	for (let slice1 = 0; slice1 <= segments; slice1++) {
		const angle = (TAU * slice1) / segments;
		const cylinderpoint = vec3.add(
			vec3.create(),
			vec3.scale(v1, xvector, cos(angle)),
			vec3.scale(v2, yvector, sin(angle)),
		);
		if (slice1 > 0) {
			// cylinder wall
			let points = [];
			points.push(vec3.add(vec3.create(), start, cylinderpoint));
			points.push(vec3.add(vec3.create(), start, prevcylinderpoint!));
			points.push(vec3.add(vec3.create(), _end, prevcylinderpoint!));
			points.push(vec3.add(vec3.create(), _end, cylinderpoint));
			polygons.push(fromPoints(points));

			let prevcospitch, prevsinpitch;
			for (let slice2 = 0; slice2 <= qsegments; slice2++) {
				const pitch = ((TAU / 4) * slice2) / qsegments;
				const cospitch = cos(pitch);
				const sinpitch = sin(pitch);
				if (slice2 > 0) {
					// cylinder rounding, start
					points = [];
					let point;
					point = vec3.add(
						vec3.create(),
						start,
						vec3.subtract(
							v1,
							vec3.scale(v1, prevcylinderpoint!, prevcospitch!),
							vec3.scale(v2, zvector, prevsinpitch!),
						),
					);
					points.push(point);
					point = vec3.add(
						vec3.create(),
						start,
						vec3.subtract(
							v1,
							vec3.scale(v1, cylinderpoint, prevcospitch!),
							vec3.scale(v2, zvector, prevsinpitch!),
						),
					);
					points.push(point);
					if (slice2 < qsegments) {
						point = vec3.add(
							vec3.create(),
							start,
							vec3.subtract(
								v1,
								vec3.scale(v1, cylinderpoint, cospitch),
								vec3.scale(v2, zvector, sinpitch),
							),
						);
						points.push(point);
					}
					point = vec3.add(
						vec3.create(),
						start,
						vec3.subtract(
							v1,
							vec3.scale(v1, prevcylinderpoint!, cospitch),
							vec3.scale(v2, zvector, sinpitch),
						),
					);
					points.push(point);

					polygons.push(fromPoints(points));

					// cylinder rounding, end
					points = [];
					point = vec3.add(
						vec3.create(),
						vec3.scale(v1, prevcylinderpoint!, prevcospitch!),
						vec3.scale(v2, zvector, prevsinpitch!),
					);
					vec3.add(point, point, _end);
					points.push(point);
					point = vec3.add(
						vec3.create(),
						vec3.scale(v1, cylinderpoint, prevcospitch!),
						vec3.scale(v2, zvector, prevsinpitch!),
					);
					vec3.add(point, point, _end);
					points.push(point);
					if (slice2 < qsegments) {
						point = vec3.add(
							vec3.create(),
							vec3.scale(v1, cylinderpoint, cospitch),
							vec3.scale(v2, zvector, sinpitch),
						);
						vec3.add(point, point, _end);
						points.push(point);
					}
					point = vec3.add(
						vec3.create(),
						vec3.scale(v1, prevcylinderpoint!, cospitch),
						vec3.scale(v2, zvector, sinpitch),
					);
					vec3.add(point, point, _end);
					points.push(point);
					JsArray.reverse(points); //points.reverse();

					polygons.push(fromPoints(points));
				}
				prevcospitch = cospitch;
				prevsinpitch = sinpitch;
			}
		}
		prevcylinderpoint = cylinderpoint;
	}
	const result = geom3.create(polygons);
	return result;
};

export default roundedCylinder;
