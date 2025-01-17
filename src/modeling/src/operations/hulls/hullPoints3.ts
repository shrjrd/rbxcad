import poly3 from "../../geometries/poly3";
import quickhull from "./quickhull";

/**
 * Create a convex hull of the given set of points, where each point is an array of [x,y,z].
 *
 * @param {Array} uniquePoints - list of UNIQUE points from which to create a hull
 * @returns {Array} a list of polygons (poly3)
 * @alias module:modeling/hulls.hullPoints3
 */
const hullPoints3 = (uniquePoints: Vec3[]) => {
	const faces = quickhull(uniquePoints, { skipTriangulation: true });

	const polygons = faces.map((face) => {
		const vertices = face.map((index: number) => uniquePoints[index]);
		return poly3.create(vertices);
	});

	return polygons;
};

export default hullPoints3;
