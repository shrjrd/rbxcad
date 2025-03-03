import type { Vec2 } from "../../maths/types";
import type { Slice, Poly3 } from "../types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as poly3 from "../poly3/index";
import { triangulate } from "./earcut/index";
import { PolygonHierarchy } from "./earcut/polygonHierarchy";

/**
 * Return a list of polygons which are enclosed by the slice.
 * @param {Slice} slice - the slice
 * @return {Array} a list of polygons (3D)
 * @alias module:modeling/geometries/slice.toPolygons
 */
export const toPolygons = (slice: Slice) => {
	const hierarchy = new PolygonHierarchy(slice);

	const polygons: Poly3[] = [];
	hierarchy.roots.forEach(({ solid, holes }: { solid: Vec2[]; holes: Vec2[][] }) => {
		// hole indices
		let index = solid.size();
		const holesIndex: number[] = [];
		holes.forEach((hole, i) => {
			holesIndex.push(index);
			index += hole.size();
		});

		// compute earcut triangulation for each solid
		const vertices = JsArray.flat([solid, ...holes]) as unknown as Vec2[]; //[solid, ...holes].flat();
		const data = JsArray.flat(vertices); //vertices.flat();
		// Get original 3D vertex by index
		const getVertex = (i: number) => hierarchy.to3D(vertices[i]);
		const indices = triangulate(data, holesIndex);
		for (let i = 0; i < indices.size(); i += 3) {
			// Map back to original vertices
			const tri = JsArray.slice(indices, i + 1, i + 3 + 1).map(getVertex); //indices.slice(i, i + 3).map(getVertex);
			polygons.push(poly3.fromVerticesAndPlane(tri, hierarchy.plane));
		}
	});

	return polygons;
};
