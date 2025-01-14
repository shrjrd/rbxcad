import { Number } from "@rbxts/luau-polyfill";

import poly3 from "../../geometries/poly3";
import { EPS } from "../../maths/constants";
import vec3 from "../../maths/vec3";
import slice from "./slice";

// https://en.wikipedia.org/wiki/Greatest_common_divisor#Using_Euclid's_algorithm
const gcd = (a: number, b: number) => {
	if (a === b) {
		return a;
	}
	if (a < b) {
		return gcd(b, a);
	}
	if (b === 1) {
		return 1;
	}
	if (b === 0) {
		return a;
	}
	return gcd(b, a % b);
};

const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

// Return a set of edges that encloses the same area by splitting
// the given edges to have newlength total edges.
const repartitionEdges = (newlength: number, edges: [Vec3, Vec3][]) => {
	// NOTE: This implementation splits each edge evenly.
	const multiple = newlength / edges.size();
	if (multiple === 1) {
		return edges;
	}

	const divisor = vec3.fromValues(multiple, multiple, multiple);

	const newEdges: [Vec3, Vec3][] = [];
	edges.forEach((edge) => {
		const increment = vec3.subtract(vec3.create(), edge[1], edge[0]);
		vec3.divide(increment, increment, divisor);

		// repartition the edge
		let prev = edge[0];
		for (let i = 1; i <= multiple; ++i) {
			const _next = vec3.add(vec3.create(), prev, increment);
			newEdges.push([prev, _next]);
			prev = _next;
		}
	});
	return newEdges;
};

const EPSAREA = ((EPS * EPS) / 2) * math.sin(math.pi / 3);

/**
 * Extrude (build) walls between the given slices.
 * Each wall consists of two triangles, which may be invalid if slices are overlapping.
 */
const extrudeWalls = (slice0: Slice, slice1: Slice) => {
	let edges0 = slice.toEdges(slice0);
	let edges1 = slice.toEdges(slice1);

	if (edges0.size() !== edges1.size()) {
		// different shapes, so adjust one or both to the same number of edges
		const newlength = lcm(edges0.size(), edges1.size());
		if (newlength !== edges0.size()) edges0 = repartitionEdges(newlength, edges0);
		if (newlength !== edges1.size()) edges1 = repartitionEdges(newlength, edges1);
	}

	const walls: Poly3[] = [];
	edges0.forEach((edge0, i) => {
		const edge1 = edges1[i];

		const poly0 = poly3.create([edge0[0], edge0[1], edge1[1]]);
		const poly0area = poly3.measureArea(poly0);
		if (Number.isFinite(poly0area) && poly0area > EPSAREA) walls.push(poly0);

		const poly1 = poly3.create([edge0[0], edge1[1], edge1[0]]);
		const poly1area = poly3.measureArea(poly1);
		if (Number.isFinite(poly1area) && poly1area > EPSAREA) walls.push(poly1);
	});
	return walls;
};

export default extrudeWalls;
