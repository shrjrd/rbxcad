import type { Geom3, Poly3 } from "../types";
import type { Mat4, Vec3 } from "../../maths/types";
import { Array as JsArray, JsMap, Number } from "@rbxts/luau-polyfill";

const Vec3ToString = (v: Vec3) => `[${v[0]},${v[1]},${v[2]}]`;

const Mat4ToString = (m: Mat4) => {
	return `[${m[0]},${m[1]},${m[2]},${m[3]},${m[4]},${m[5]},${m[6]},${m[7]},${m[8]},${m[9]},${m[10]},${m[11]},${m[12]},${m[13]},${m[14]},${m[15]}]`;
};

import * as poly3 from "../poly3/index";
import { isA } from "./isA";

/**
 * Determine if the given object is a valid 3D geometry.
 * Checks for valid data structure, convex polygon faces, and manifold edges.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/geom3.validate
 */
export const validate = (object: Geom3) => {
	if (!isA(object)) {
		throw "invalid geom3 structure";
	}

	// check polygons
	object.polygons.forEach(poly3.validate);
	validateManifold(object);

	// check transforms
	if (!object.transforms.every(Number.isFinite)) {
		throw `geom3 invalid transforms ${Mat4ToString(object.transforms)}`;
	}

	// TODO: check for self-intersecting
};

/**
 * Check manifold edge condition: Every edge is in exactly 2 faces
 */
const validateManifold = (object: Geom3) => {
	// count of each edge
	const edgeCount = new JsMap<string, number>();
	object.polygons.forEach(({ vertices }: Poly3) => {
		vertices.forEach((v: Vec3, i: number) => {
			const v1 = Vec3ToString(v);
			const v2 = Vec3ToString(vertices[(i + 1) % vertices.size()]);
			// sort for undirected edge
			const edge = `${v1}/${v2}`;
			const count = edgeCount.has(edge) ? edgeCount.get(edge)! : 0;
			edgeCount.set(edge, count + 1);
		});
	});

	// check that edges are always matched
	const nonManifold: string[] = [];
	edgeCount.forEach((count, edge) => {
		const complementEdge = JsArray.reverse(edge.split("/")).join("/"); // edge.split("/").reverse().join("/");
		const complementCount = edgeCount.get(complementEdge);
		if (count !== complementCount) {
			//nonManifold.push(edge.replace("/", " -> "));
			nonManifold.push(edge.gsub("/", " -> ")[0]);
		}
	});
	if (nonManifold.size() > 0) {
		throw `non-manifold edges ${nonManifold.size()}\n${nonManifold.join("\n")}`;
	}
};
