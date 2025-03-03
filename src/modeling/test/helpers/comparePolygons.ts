import type { Poly3 } from "../../src/geometries/types";
import { compareVectors } from "./compareVectors";

/**
 * Compare two polygons for equality
 * @param {Poly3} poly1 - polygon with plane and vertices
 * @param {Poly3} poly2 - polygon with plane and vertices
 * @returns {boolean} result of comparison
 */
export const comparePolygons = (poly1: Poly3, poly2: Poly3) => {
	if (poly1.vertices.size() === poly2.vertices.size()) {
		return poly1.vertices.reduce(
			(valid, vertex, index) => valid && compareVectors(poly1.vertices[index], poly2.vertices[index]),
			true,
		);
	}
	return false;
};
