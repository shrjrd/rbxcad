import type { Vec2 } from "../types";

/**
 * Calculate the area under the given points.
 * @param {Array} points - list of 2D points
 * @return {number} area under the given points
 * @alias module:modeling/maths/utils.area
 */
export const area = (points: Vec2[]) => {
	let area = 0;
	for (let i = 0; i < points.size(); i++) {
		const j = (i + 1) % points.size();
		area += points[i][0] * points[j][1];
		area -= points[j][0] * points[i][1];
	}
	return area / 2.0;
};
