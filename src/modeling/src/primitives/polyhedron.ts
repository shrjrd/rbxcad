import type { Vec3 } from "../maths/types";
import type { RGB, RGBA } from "../colors/types";

export interface PolyhedronOptions {
	points: Array<Vec3>;
	faces: Array<Array<number>>;
	colors?: Array<RGB | RGBA>;
	orientation?: "outward" | "inward";
}

import { Array as JsArray, Object } from "@rbxts/luau-polyfill";

import * as geom3 from "../geometries/geom3/index";
import * as poly3 from "../geometries/poly3/index";
import { isNumberArray } from "./commonChecks";

/**
 * Construct a polyhedron in three dimensional space from the given set of 3D vertices and faces.
 *
 * The faces can define outward or inward facing polygons (orientation).
 * However, each face must define a counterclockwise rotation of vertices which follows the right hand rule.
 * @param {object} options - options for construction
 * @param {Array} options.points - list of points in 3D space
 * @param {Array} options.faces - list of faces, where each face is a set of indexes into the points
 * @param {Array} [options.colors=undefined] - list of RGBA colors to apply to each face
 * @param {string} [options.orientation='outward'] - orientation of faces
 * @returns {Geom3} new 3D geometry
 * @alias module:modeling/primitives.polyhedron
 *
 * @example
 * let myPoints = [ [10, 10, 0], [10, -10, 0], [-10, -10, 0], [-10, 10, 0], [0, 0, 10] ]
 * let myFaces = [ [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4], [1, 0, 3], [2, 1, 3] ]
 * let myShape = polyhedron({points: myPoints, faces: myFaces, orientation: 'inward'})
 */
export const polyhedron = (options: PolyhedronOptions) => {
	const defaults = {
		points: [] as Vec3[],
		faces: [] as number[][],
		colors: undefined! as RGBA[],
		orientation: "outward",
	};
	const { points, faces, colors, orientation } = Object.assign({}, defaults, options);

	if (!(JsArray.isArray(points) && JsArray.isArray(faces))) {
		throw "points and faces must be arrays";
	}
	if (points.size() < 3) {
		throw "three or more points are required";
	}
	if (faces.size() < 1) {
		throw "one or more faces are required";
	}
	if (colors) {
		if (!JsArray.isArray(colors)) {
			throw "colors must be an array";
		}
		if (colors.size() !== faces.size()) {
			throw "faces and colors must have the same length";
		}
	}
	points.forEach((vertex, i) => {
		if (!isNumberArray(vertex, 3)) throw `vertex ${i} must be an array of X, Y, Z values`;
	});
	faces.forEach((face, i) => {
		if (face.size() < 3) throw `face ${i} must contain 3 or more indexes`;
		if (!isNumberArray(face, face.size())) throw `face ${i} must be an array of numbers`;
	});

	// invert the faces if orientation is inwards, as all internals expect outward facing polygons
	if (orientation !== "outward") {
		faces.forEach((face) => JsArray.reverse(face)); //face.reverse());
	}

	const polygons = faces.map((face, findex) => {
		const polygon = poly3.create(face.map((pindex) => points[pindex]));
		if (colors && colors[findex]) polygon.color = colors[findex];
		return polygon;
	});

	return geom3.create(polygons);
};
