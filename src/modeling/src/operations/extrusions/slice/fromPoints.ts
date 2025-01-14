import { Array } from "@rbxts/luau-polyfill";

import vec3 from "../../../maths/vec3";
import create from "./create";

/**
 * Create a slice from the given points.
 *
 * @param {Array} points - list of points, where each point is either 2D or 3D
 * @returns {slice} a new slice
 * @alias module:modeling/extrusions/slice.fromPoints
 *
 * @example
 * const points = [
 *   [0,  0],
 *   [0, 10],
 *   [0, 10]
 * ]
 * const slice = fromPoints(points)
 */
const fromPoints = (points: Vec2[] | Vec3[]): Slice => {
	if (!Array.isArray(points)) error("the given points must be an array");
	if (points.size() < 3) error("the given points must contain THREE or more points");

	// create a list of edges from the points
	const edges: [Vec3, Vec3][] = [];
	let prevpoint = points[points.size() - 1];
	points.forEach((point: Vec2 | Vec3) => {
		if (point.size() === 2)
			edges.push([vec3.fromVec2(vec3.create(), prevpoint), vec3.fromVec2(vec3.create(), point)]);
		if (point.size() === 3) edges.push([prevpoint as Vec3, point as Vec3]);
		prevpoint = point;
	});
	return create(edges);
};

export default fromPoints;
