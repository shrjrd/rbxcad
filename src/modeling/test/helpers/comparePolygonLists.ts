import type { Poly3 } from "../../src/geometries/types";
import { comparePolygons } from "./comparePolygons";

export const comparePolygonLists = (polygons1: Poly3[], polygons2: Poly3[]) => {
	if (polygons1.size() === polygons2.size()) {
		return polygons1.reduce(
			(valid, polygon, index) => valid && comparePolygons(polygons1[index], polygons2[index]),
			true,
		);
	}
	return false;
};
