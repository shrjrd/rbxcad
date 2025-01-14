import { Array as JsArray } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import vec2 from "../../maths/vec2";

const JSRound = (value: number) => {
	if (value === 0) return 0;
	// For both positive and negative numbers:
	// Add 0.5 for positive numbers, subtract 0.5 for negative
	// Then truncate towards zero using math.floor for positive
	// and math.ceil for negative
	return value > 0 ? math.floor(value + 0.5) : math.ceil(value - 0.5);
};

const fromFakePolygon = (epsilon: number, polygon: Poly3): Vec2[] => {
	// this can happen based on union, seems to be residuals -
	// return null and handle in caller
	if (polygon.vertices.size() < 4) {
		return undefined!;
	}
	const vert1Indices: number[] = [];
	const points3D = polygon.vertices.filter((vertex, i) => {
		if (vertex[2] > 0) {
			vert1Indices.push(i);
			return true;
		}
		return false;
	});

	if (points3D.size() !== 2) {
		throw error("Assertion failed: fromFakePolygon: not enough points found"); // TBD remove later
	}

	const points2D = points3D.map((v3) => {
		const x = JSRound(v3[0] / epsilon) * epsilon + 0; // no more -0
		const y = JSRound(v3[1] / epsilon) * epsilon + 0; // no more -0
		return vec2.fromValues(x, y);
	});

	if (vec2.equals(points2D[0], points2D[1])) return undefined!;

	const d = vert1Indices[1] - vert1Indices[0];
	if (d === 1 || d === 3) {
		if (d === 1) {
			JsArray.reverse(points2D); //points2D.reverse();
		}
	} else {
		throw error("Assertion failed: fromFakePolygon: unknown index ordering");
	}
	return points2D;
};

/**
 * Convert the given polygons to a list of sides.
 * The polygons must have only z coordinates +1 and -1, as constructed by to3DWalls().
 */
const fromFakePolygons = (epsilon: number, polygons: Poly3[]) => {
	const sides = polygons
		.map((polygon) => fromFakePolygon(epsilon, polygon))
		.filter((polygon) => polygon !== undefined) as [Vec2, Vec2][];
	return geom2.create(sides);
};

export default fromFakePolygons;
