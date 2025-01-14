import { JsSet } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import geom3 from "../../geometries/geom3";
import path2 from "../../geometries/path2";

function VecToString(vec: number[]) {
	if (vec[2]) {
		return `${vec[0]},${vec[1]},${vec[2]}`;
	} else {
		return `${vec[0]},${vec[1]}`;
	}
}
/**
 * Return the unique vertices of a geometry
 */
const toUniquePoints = (geometries: object[]) => {
	const found = new JsSet();
	const uniquePoints: number[][] = [];

	const addPoint = (point: number[]) => {
		const key = VecToString(point); //point.toString();
		if (!found.has(key)) {
			uniquePoints.push(point);
			found.add(key);
		}
	};

	geometries.forEach((geometry: object) => {
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

export default toUniquePoints;
