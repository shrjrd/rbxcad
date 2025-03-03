import type { Poly2 } from "../types";
import { intersect } from "../../maths/utils/intersect";

/**
 * Check whether the given polygon is simple, i.e. does not intersect itself.
 * @see https://en.wikipedia.org/wiki/Simple_polygon
 * @param {Poly2} polygon - the polygon to interrogate
 * @returns {Boolean} true if simple
 * @alias module:modeling/geometries/poly2.isSimple
 */
export const isSimple = (polygon: Poly2) => {
	const numPoints = polygon.points.size();
	if (numPoints < 3) return false; // only polygons with an areas are simple

	if (numPoints === 3) return true; // triangles are simple

	const points = polygon.points;

	// proof one: there are N unique points
	const found = new Set();
	points.forEach((v) => found.add(`${v[0]},${v[1]}`)); //found.add(v.toString()));
	if (found.size() !== numPoints) return false;

	// proof two: line segments do not cross
	for (let i = 0; i < numPoints; i++) {
		for (let j = i + 2; j < numPoints; j++) {
			const k = (j + 1) % numPoints;
			if (i !== k) {
				const s0 = points[i];
				const s1 = points[(i + 1) % numPoints];
				const z0 = points[j];
				const z1 = points[k];
				const ip = intersect(s0, s1, z0, z1);
				if (ip) return false;
			}
		}
	}
	return true;
};
