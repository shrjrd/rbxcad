import type { Poly3 } from "./type";
import type { Vec4, Vec3 } from "../../maths/types";
import * as vec4 from "../../maths/vec4/index";

const cache = new WeakMap<Poly3, Vec4>();

/**
 * Measure the bounding sphere of the given polygon.
 * @param {Poly3} polygon - the polygon to measure
 * @returns {Vec4} the computed bounding sphere; center vertex (3D) and radius
 * @alias module:modeling/geometries/poly3.measureBoundingSphere
 */
export const measureBoundingSphere = (polygon: Poly3) => {
	const boundingSphere = cache.get(polygon);
	if (boundingSphere) return boundingSphere;

	const vertices = polygon.vertices;
	const out = vec4.create();

	if (vertices.size() === 0) {
		out[0] = 0;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		return out;
	}

	// keep a list of min/max vertices by axis
	let minx = vertices[0];
	let miny = minx;
	let minz = minx;
	let maxx = minx;
	let maxy = minx;
	let maxz = minx;

	vertices.forEach((v: Vec3) => {
		if (minx[0] > v[0]) minx = v;
		if (miny[1] > v[1]) miny = v;
		if (minz[2] > v[2]) minz = v;
		if (maxx[0] < v[0]) maxx = v;
		if (maxy[1] < v[1]) maxy = v;
		if (maxz[2] < v[2]) maxz = v;
	});

	out[0] = (minx[0] + maxx[0]) * 0.5; // center of sphere
	out[1] = (miny[1] + maxy[1]) * 0.5;
	out[2] = (minz[2] + maxz[2]) * 0.5;
	const x = out[0] - maxx[0];
	const y = out[1] - maxy[1];
	const z = out[2] - maxz[2];
	out[3] = math.sqrt(x * x + y * y + z * z); // radius of sphere

	cache.set(polygon, out);

	return out;
};
