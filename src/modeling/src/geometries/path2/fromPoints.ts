import { Object } from "@rbxts/luau-polyfill";

import { EPS } from "../../maths/constants";
import vec2 from "../../maths/vec2";
import close from "./close";
import create from "./create";

type FromPointsOptions = {
	closed?: boolean;
};
/**
 * Create a new path from the given points.
 * The points must be provided an array of points,
 * where each point is an array of two numbers.
 * @param {Object} options - options for construction
 * @param {Boolean} [options.closed=false] - if the path should be open or closed
 * @param {Array} points - array of points (2D) from which to create the path
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.fromPoints
 *
 * @example:
 * my newpath = fromPoints({closed: true}, [[10, 10], [-10, 10]])
 */
const fromPoints = (options: FromPointsOptions, points: Vec2[]) => {
	const defaults = { closed: false };
	let { closed } = Object.assign({}, defaults, options);

	let created = create();
	created.points = points.map((point) => vec2.clone(point));

	// check if first and last points are equal
	if (created.points.size() > 1) {
		const p0 = created.points[0];
		const pn = created.points[created.points.size() - 1];
		if (vec2.distance(p0, pn) < EPS * EPS) {
			// and close automatically
			closed = true;
		}
	}
	if (closed === true) created = close(created);

	return created;
};

export default fromPoints;
