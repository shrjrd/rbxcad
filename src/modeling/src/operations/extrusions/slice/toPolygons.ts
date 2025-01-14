import { Array as JsArray } from "@rbxts/luau-polyfill";

import poly3 from "../../../geometries/poly3";
import earcut from "../earcut";
import PolygonHierarchy from "../earcut/polygonHierarchy";

/**
 * Return a list of polygons which are enclosed by the slice.
 * @param {slice} slice - the slice
 * @return {Array} a list of polygons (3D)
 * @alias module:modeling/extrusions/slice.toPolygons
 */
const toPolygons = (slice: Slice) => {
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
		//const vertices = [solid, ...holes].flat();
		const vertices = JsArray.flat([solid, ...holes]);
		//const data = vertices.flat();
		const data = JsArray.flat(vertices);
		// Get original 3D vertex by index
		const getVertex = (i: number) => hierarchy.to3D(vertices[i] as unknown as Vec2);
		const indices = earcut(data, holesIndex);
		for (let i = 0; i < indices.size(); i += 3) {
			// Map back to original vertices
			//const tri = indices.slice(i, i + 3).map(getVertex);
			const tri = JsArray.slice(indices, i + 1, i + 3 + 1).map(getVertex);
			polygons.push(poly3.fromPointsAndPlane(tri, hierarchy.plane));
		}
	});

	return polygons;
};

export default toPolygons;
