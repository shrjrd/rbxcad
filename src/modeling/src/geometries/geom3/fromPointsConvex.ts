import type { Vec3 } from "../../maths/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import { runner } from "../../operations/hulls/quickhull/index";
import * as poly3 from "../poly3/index";
import { create } from "./create";

/**
 * Construct a new convex 3D geometry from a list of unique points.
 *
 * @param {Array} uniquePoints - list of points to construct convex 3D geometry
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.fromPointsConvex
 */
export const fromPointsConvex = (uniquePoints: Vec3[]) => {
	if (!JsArray.isArray(uniquePoints)) {
		throw "the given points must be an array";
	}

	const faces = runner(uniquePoints, { skipTriangulation: true });

	const polygons = faces.map((face) => {
		const vertices = face.map((index) => uniquePoints[index]);
		return poly3.create(vertices);
	});

	return create(polygons);
};
