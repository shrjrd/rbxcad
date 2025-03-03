import type { Geometry, Geom2, Geom3, Path2 } from "../../geometries/types";
import type { RecursiveArray } from "../../utils/recursiveArray";
import type { Vec2 } from "../../maths/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import * as path2 from "../../geometries/path2/index";
import * as poly2 from "../../geometries/poly2/index";
import * as vec2 from "../../maths/vec2/index";
import { measureEpsilon } from "../../measurements/measureEpsilon";
import { snapPolygons } from "./snapPolygons";

const snapPath2 = (geometry: Path2) => {
	const epsilon = measureEpsilon(geometry) as number;
	const points = path2.toPoints(geometry);
	const newPoints = points.map((point) => vec2.snap(vec2.create(), point, epsilon));
	// snap can produce duplicate points, remove those
	return path2.create(newPoints);
};

const snapGeom2 = (geometry: Geom2) => {
	const epsilon = measureEpsilon(geometry) as number;
	const outlines = geom2.toOutlines(geometry);
	let newOutlines = outlines.map((outline) => {
		let prev = vec2.snap(vec2.create(), outline[outline.size() - 1], epsilon);
		const newOutline: Vec2[] = [];
		outline.forEach((point) => {
			const snapped = vec2.snap(vec2.create(), point, epsilon);
			// remove duplicate points
			if (!vec2.equals(prev, snapped)) {
				newOutline.push(snapped);
			}
			prev = snapped;
		});
		return newOutline;
	});
	// remove zero-area outlines
	newOutlines = newOutlines.filter((outline) => poly2.measureArea(poly2.create(outline)) !== 0);
	return geom2.create(newOutlines);
};

const snapGeom3 = (geometry: Geom3) => {
	const epsilon = measureEpsilon(geometry) as number;
	const polygons = geom3.toPolygons(geometry);
	const newPolygons = snapPolygons(epsilon, polygons);
	return geom3.create(newPolygons);
};

/**
 * Snap the given geometries to the precision (calculated epsilon) of the geometry.
 * @see measurements.measureEpsilon()
 * @param {...Object} geometries - the geometries to snap
 * @return {Object|Array} the snapped geometry, or a list of snapped geometries
 * @alias module:modeling/modifiers.snap
 */
export const snap = <T extends Geometry>(...geometries: RecursiveArray<T>): T | Array<T> => {
	const results = geometries.map((geometry) => {
		if (path2.isA(geometry)) return snapPath2(geometry as Path2);
		if (geom2.isA(geometry)) return snapGeom2(geometry as Geom2);
		if (geom3.isA(geometry)) return snapGeom3(geometry as Geom3);
		if (JsArray.isArray(geometry)) return snap(...geometry);
		return geometry;
	});
	return results.size() === 1 ? (results[0] as T) : (results as Array<T>);
};
