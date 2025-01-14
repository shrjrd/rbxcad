import { Number } from "@rbxts/luau-polyfill";

import poly3 from "../../geometries/poly3";
import vec3 from "../../maths/vec3";

const isValidPoly3 = (epsilon: number, polygon: Poly3) => {
	const area = math.abs(poly3.measureArea(polygon));
	return Number.isFinite(area) && area > epsilon;
};

/*
 * Snap the given list of polygons to the epsilon.
 */
const snapPolygons = (epsilon: number, polygons: Poly3[]) => {
	let newpolygons = polygons.map((polygon) => {
		const snapvertices = polygon.vertices.map((vertice) => vec3.snap(vec3.create(), vertice, epsilon));
		// only retain unique vertices
		const newvertices = [];
		for (let i = 0; i < snapvertices.size(); i++) {
			const j = (i + 1) % snapvertices.size();
			if (!vec3.equals(snapvertices[i], snapvertices[j])) newvertices.push(snapvertices[i]);
		}
		const newpolygon = poly3.create(newvertices);
		if (polygon.color) newpolygon.color = polygon.color;
		return newpolygon;
	});
	// snap can produce polygons with zero (0) area, remove those
	const epsilonArea = (epsilon * epsilon * math.sqrt(3)) / 4;
	newpolygons = newpolygons.filter((polygon) => isValidPoly3(epsilonArea, polygon));
	return newpolygons;
};

export default snapPolygons;
