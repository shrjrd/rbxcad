import type { Vec2 } from "../maths/types";

export interface PolygonOptions {
	points: Array<Vec2> | Array<Array<Vec2>>;
	paths?: Array<number> | Array<Array<number>>;
	orientation?: "counterclockwise" | "clockwise";
}

import { Array as JsArray, Object } from "@rbxts/luau-polyfill";

import * as geom2 from "../geometries/geom2/index";

/**
 * Construct a polygon in two dimensional space from a list of points, or a list of points and paths.
 *
 * NOTE: The ordering of points is important, and must define a counter clockwise rotation of points.
 *
 * @param {object} options - options for construction
 * @param {Array} options.points - points of the polygon : either flat or nested array of 2D points
 * @param {Array} [options.paths] - paths of the polygon : either flat or nested array of point indexes
 * @param {String} [options.orientation='counterclockwise'] - orientation of points
 * @returns {Geom2} new 2D geometry
 * @alias module:modeling/primitives.polygon
 *
 * @example
 * let roof = [[10,11], [0,11], [5,20]]
 * let wall = [[0,0], [10,0], [10,10], [0,10]]
 *
 * let poly = polygon({ points: roof })
 * or
 * let poly = polygon({ points: [roof, wall] })
 * or
 * let poly = polygon({ points: roof, paths: [0, 1, 2] })
 * or
 * let poly = polygon({ points: [roof, wall], paths: [[0, 1, 2], [3, 4, 5, 6]] })
 */
export const polygon = (options: PolygonOptions) => {
	const defaults = {
		points: []! as Vec2[][],
		paths: []! as number[][],
		orientation: "counterclockwise",
	};
	const { points, paths, orientation } = Object.assign({}, defaults, options);

	if (!(JsArray.isArray(points) && JsArray.isArray(paths))) throw "points and paths must be arrays";

	let listOfPolys = points;
	if (JsArray.isArray(points[0])) {
		if (!JsArray.isArray(points[0][0])) {
			// points is an array of something... convert to list
			listOfPolys = [points as Vec2[]];
		}
	}

	listOfPolys.forEach((list, i) => {
		if (!JsArray.isArray(list)) throw "list of points " + i + " must be an array";
		if (list.size() < 3) throw "list of points " + i + " must contain three or more points";
		list.forEach((point, j) => {
			if (!JsArray.isArray(point)) throw "list of points " + i + ", point " + j + " must be an array";
			if (point.size() < 2) throw "list of points " + i + ", point " + j + " must contain by X and Y values";
		});
	});

	let listOfPaths = paths;
	if (paths.size() === 0) {
		// create a list of paths based on the points
		let count = 0;
		listOfPaths = listOfPolys.map((list) => list.map((point: Vec2) => count++));
	}

	// flatten the listOfPoints for indexed access
	const allPoints: Vec2[] = [];
	listOfPolys.forEach((list) => list.forEach((point: Vec2) => allPoints.push(point)));

	const outlines: Vec2[][] = [];
	listOfPaths.forEach((path) => {
		const setOfPoints = path.map((index: number) => allPoints[index]);
		outlines.push(setOfPoints);
	});

	let geometry = geom2.create(outlines);
	if (orientation === "clockwise") {
		geometry = geom2.reverse(geometry);
	}
	return geometry;
};
