import type { Geometry, Geom2, Geom3, Path2 } from "../../geometries/types";
import { JsSet } from "@rbxts/luau-polyfill";
function VecToString(vec: number[]) {
	if (vec[2] !== undefined) {
		return `${vec[0]},${vec[1]},${vec[2]}`;
	} else {
		return `${vec[0]},${vec[1]}`;
	}
}
import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import * as path2 from "../../geometries/path2/index";

/**
 * Return the unique vertices of a geometry
 */
export const toUniquePoints = (geometries: Geometry[]) => {
	const found = new JsSet<string>();
	const uniquePoints: number[][] = [];

	const addPoint = (point: number[]) => {
		const key = VecToString(point); //point.toString();
		if (!found.has(key)) {
			uniquePoints.push(point);
			found.add(key);
		}
	};

	geometries.forEach((geometry) => {
		if (geom2.isA(geometry)) {
			geom2.toPoints(geometry as Geom2).forEach(addPoint);
		} else if (geom3.isA(geometry)) {
			// points are grouped by polygon
			geom3.toPoints(geometry as Geom3).forEach((points) => points.forEach(addPoint));
		} else if (path2.isA(geometry)) {
			path2.toPoints(geometry as Path2).forEach(addPoint);
		}
	});

	return uniquePoints;
};
