import toSides from "./toSides";

/**
 * Produces an array of points from the given geometry.
 * The returned array should not be modified as the points are shared with the geometry.
 * NOTE: The points returned do NOT define an order. Use toOutlines() for ordered points.
 * @param {geom2} geometry - the geometry
 * @returns {Array} an array of points
 * @alias module:modeling/geometries/geom2.toPoints
 *
 * @example
 * let sharedpoints = toPoints(geometry)
 */
const toPoints = (geometry: Geom2): Vec2[] => {
	const sides = toSides(geometry);
	const points = sides.map((side) => side[0]);
	// due to the logic of fromPoints()
	// move the first point to the last
	if (points.size() > 0) {
		points.push(points.shift() as Vec2);
	}
	return points;
};

export default toPoints;
