import { Array, Error, Object } from "@rbxts/luau-polyfill";

import geom3 from "../geometries/geom3";
import poly3 from "../geometries/poly3";
import { isNumberArray } from "./commonChecks";

type PolyhedronOptions = {
	points: Vec3[];
	faces: number[][];
	colors?: number[][];
	orientation?: "outward" | "inward";
};
/**
 * Construct a polyhedron in three dimensional space from the given set of 3D points and faces.
 *
 * The faces can define outward or inward facing polygons (orientation).
 * However, each face must define a counter clockwise rotation of points which follows the right hand rule.
 * @param {Object} options - options for construction
 * @param {Array} options.points - list of points in 3D space
 * @param {Array} options.faces - list of faces, where each face is a set of indexes into the points
 * @param {Array} [options.colors=undefined] - list of RGBA colors to apply to each face
 * @param {String} [options.orientation='outward'] - orientation of faces
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.polyhedron
 *
 * @example
 * let mypoints = [ [10, 10, 0], [10, -10, 0], [-10, -10, 0], [-10, 10, 0], [0, 0, 10] ]
 * let myfaces = [ [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4], [1, 0, 3], [2, 1, 3] ]
 * let myshape = polyhedron({points: mypoints, faces: myfaces, orientation: 'inward'})
 */
const polyhedron = (options: PolyhedronOptions) => {
	const defaults = {
		points: [] as Vec3[],
		faces: [] as number[][],
		colors: undefined as unknown as number[][],
		orientation: "outward",
	};
	const { points, faces, colors, orientation } = Object.assign({}, defaults, options);

	if (!(Array.isArray(points) && Array.isArray(faces))) {
		throw new Error("points and faces must be arrays");
	}
	if (points.size() < 3) {
		throw new Error("three or more points are required");
	}
	if (faces.size() < 1) {
		throw new Error("one or more faces are required");
	}
	if (colors) {
		if (!Array.isArray(colors)) {
			throw new Error("colors must be an array");
		}
		if (colors.size() !== faces.size()) {
			throw new Error("faces and colors must have the same length");
		}
	}
	points.forEach((point, i) => {
		if (!isNumberArray(point, 3)) throw new Error(`point ${i} must be an array of X, Y, Z values`);
	});
	faces.forEach((face, i) => {
		if (face.size() < 3) throw new Error(`face ${i} must contain 3 or more indexes`);
		if (!isNumberArray(face, face.size())) throw new Error(`face ${i} must be an array of numbers`);
	});

	// invert the faces if orientation is inwards, as all internals expect outwarding facing polygons
	if (orientation !== "outward") {
		faces.forEach((face) => Array.reverse(face)); //face.reverse());
	}

	const polygons = faces.map((face, findex) => {
		const polygon = poly3.create(face.map((pindex) => points[pindex]));
		if (colors && colors[findex]) polygon.color = colors[findex] as Color;
		return polygon;
	});

	return geom3.create(polygons);
};

export default polyhedron;