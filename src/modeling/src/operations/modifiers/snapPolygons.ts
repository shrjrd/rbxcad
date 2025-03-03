import type { Poly3 } from "../../geometries/types";
import type { Vec3 } from "../../maths/types";
import { Number } from "@rbxts/luau-polyfill";

import * as poly3 from "../../geometries/poly3/index";
import * as vec3 from "../../maths/vec3/index";

const isValidPoly3 = (epsilon: number, polygon: Poly3) => {
	const area = math.abs(poly3.measureArea(polygon));
	return Number.isFinite(area) && area > epsilon;
};

/**
 * Snap the given list of polygons to the epsilon.
 */
export const snapPolygons = (epsilon: number, polygons: Poly3[]) => {
	let newPolygons = polygons.map((polygon) => {
		const snapVertices = polygon.vertices.map((vertex) => vec3.snap(vec3.create(), vertex, epsilon));
		// only retain unique vertices
		const newVertices: Vec3[] = [];
		for (let i = 0; i < snapVertices.size(); i++) {
			const j = (i + 1) % snapVertices.size();
			if (!vec3.equals(snapVertices[i], snapVertices[j])) newVertices.push(snapVertices[i]);
		}
		const newPolygon = poly3.create(newVertices);
		if (polygon.color) newPolygon.color = polygon.color;
		return newPolygon;
	});
	// snap can produce polygons with zero (0) area, remove those
	const epsilonArea = (epsilon * epsilon * math.sqrt(3)) / 4;
	newPolygons = newPolygons.filter((polygon) => isValidPoly3(epsilonArea, polygon));
	return newPolygons;
};
