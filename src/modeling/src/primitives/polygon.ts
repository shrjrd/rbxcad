import { Array, Error, Object } from "@rbxts/luau-polyfill";

import geom2 from "../geometries/geom2";

type PolygonOptions = {
	points: Vec2[] | Vec2[][];
	paths?: number[] | number[][];
	orientation?: "counterclockwise" | "clockwise";
};
/**
 * Construct a polygon in two dimensional space from a list of points, or a list of points and paths.
 *
 * NOTE: The ordering of points is important, and must define a counter clockwise rotation of points.
 *
 * @param {Object} options - options for construction
 * @param {Array} options.points - points of the polygon : either flat or nested array of 2D points
 * @param {Array} [options.paths] - paths of the polygon : either flat or nested array of point indexes
 * @param {String} [options.orientation='counterclockwise'] - orientation of points
 * @returns {geom2} new 2D geometry
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
const polygon = (options: PolygonOptions) => {
	const defaults = {
		points: [] as Vec2[] | Vec2[][],
		paths: [] as number[] | number[][],
		orientation: "counterclockwise",
	};
	const { points, paths, orientation } = Object.assign({}, defaults, options);

	if (!(Array.isArray(points) && Array.isArray(paths))) throw new Error("points and paths must be arrays");

	let listofpolys = points;
	if (Array.isArray(points[0])) {
		if (!Array.isArray(points[0][0])) {
			// points is an array of something... convert to list
			listofpolys = [points] as Vec2[] | Vec2[][];
		}
	}

	listofpolys.forEach((list, i) => {
		if (!Array.isArray(list)) throw new Error("list of points " + i + " must be an array");
		if (list.size() < 3) throw new Error("list of points " + i + " must contain three or more points");
		list.forEach((point, j) => {
			if (!Array.isArray(point)) throw new Error("list of points " + i + ", point " + j + " must be an array");
			if (point.size() < 2)
				throw new Error("list of points " + i + ", point " + j + " must contain by X and Y values");
		});
	});

	let listofpaths = paths;
	if (paths.size() === 0) {
		// create a list of paths based on the points
		let count = 0;
		listofpaths = listofpolys.map((list) => list.map((point) => count++));
	}

	// flatten the listofpoints for indexed access
	const allpoints: Vec2[] = [];
	listofpolys.forEach((list) => list.forEach((point) => allpoints.push(point as Vec2)));

	// convert the list of paths into a list of sides, and accumulate
	let sides: [Vec2, Vec2][] = [];
	(listofpaths as number[][]).forEach((path: number[]) => {
		const setofpoints = path.map((index: number) => allpoints[index]);
		const geometry = geom2.fromPoints(setofpoints);
		sides = Array.concat(sides, geom2.toSides(geometry)); //sides.concat(geom2.toSides(geometry));
	});

	// convert the list of sides into a geometry
	let geometry = geom2.create(sides);
	if (orientation === "clockwise") {
		geometry = geom2.reverse(geometry);
	}
	return geometry;
};

export default polygon;
