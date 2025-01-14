import vec3 from "../../maths/vec3";
import create from "./create";

/**
 * Create a polygon from the given points.
 *
 * @param {Array} points - list of points (3D)
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometries/poly3.fromPoints
 *
 * @example
 * const points = [
 *   [0,  0, 0],
 *   [0, 10, 0],
 *   [0, 10, 10]
 * ]
 * const polygon = fromPoints(points)
 */
const fromPoints = (points: number[][] | Vec3[]): Poly3 => {
	const vertices = points.map((point) => vec3.clone(point as Vec3));
	return create(vertices);
};

export default fromPoints;
