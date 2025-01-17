/**
 * Calculate the area under the given points.
 * @param {Array} points - list of 2D points
 * @return {Number} area under the given points
 * @alias module:modeling/maths/utils.area
 */
const area = (points: Array<Vec2>): number => {
	let area = 0;
	for (let i = 0; i < points.size(); i++) {
		const j = (i + 1) % points.size();
		area += points[i][0] * points[j][1];
		area -= points[j][0] * points[i][1];
	}
	return area / 2.0;
};

export default area;
