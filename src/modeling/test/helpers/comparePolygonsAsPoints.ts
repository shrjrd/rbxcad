import compareVectors from "./compareVectors";

const comparePolygons = (poly1: Array<Vec2 | Vec3>, poly2: Array<Vec2 | Vec3>) => {
	if (poly1.size() === poly2.size()) {
		return poly1.reduce((valid, point, index) => valid && compareVectors(poly1[index], poly2[index]), true);
	}
	return false;
};

/**
 * Compare two list of points for equality
 * @param (Array} list1 - list of polygons, represented as points
 * @param (Array} list2 - list of polygons, represented as points
 * @returns {boolean} result of comparison
 */
const comparePolygonsAsPoints = (list1: Vec3[][] | Vec2[][], list2: Vec3[][] | Vec2[][]) => {
	if (list1.size() === list2.size()) {
		return list1.reduce(
			(valid, polygon, index: number) => valid && comparePolygons(list1[index], list2[index]),
			true,
		);
	}
	return false;
};

export default comparePolygonsAsPoints;
