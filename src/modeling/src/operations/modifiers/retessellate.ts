import { Array } from "@rbxts/luau-polyfill";

import geom3 from "../../geometries/geom3";
import poly3 from "../../geometries/poly3";
import { NEPS } from "../../maths/constants";
import reTesselateCoplanarPolygons from "./reTesselateCoplanarPolygons";

type Polygon = {
	vertices: Vec3[];
	plane: _Plane;
	index: number;
};
/**
  After boolean operations all coplanar polygon fragments are joined by a retesselating
  operation. geom3.reTesselate(geom).
  Retesselation is done through a linear sweep over the polygon surface.
  The sweep line passes over the y coordinates of all vertices in the polygon.
  Polygons are split at each sweep line, and the fragments are joined horizontally and vertically into larger polygons
  (making sure that we will end up with convex polygons).
*/
const retessellate = (geometry: Geom3): Geom3 => {
	if (geometry.isRetesselated) {
		return geometry;
	}

	const polygons: Polygon[] = geom3.toPolygons(geometry).map((polygon, index) => ({
		vertices: polygon.vertices,
		plane: poly3.plane(polygon),
		index: index,
	}));
	const classified = classifyPolygons(polygons);
	const destPolygons: Poly3[] = [];
	classified.forEach((group) => {
		if (Array.isArray(group)) {
			const reTessellateCoplanarPolygons = reTesselateCoplanarPolygons(group);
			//destPolygons.push(...reTessellateCoplanarPolygons);
			for (let i = 0; i < reTessellateCoplanarPolygons.size(); i++) {
				destPolygons.push(reTessellateCoplanarPolygons[i]);
			}
		} else {
			destPolygons.push(group[0]);
		}
	});

	const result = geom3.create(destPolygons);
	result.isRetesselated = true;

	return result;
};

const classifyPolygons = (polygons: Polygon[]): Polygon[][] => {
	let clusters = [polygons]; // a cluster is an array of potentially coplanar polygons
	const nonCoplanar: Polygon[] = []; // polygons that are known to be non-coplanar
	// go through each component of the plane starting with the last one (the distance from origin)
	for (let component = 3; component >= 0; component--) {
		const maybeCoplanar: Polygon[][] = [];
		const tolerance = component === 3 ? 0.000000015 : NEPS;
		clusters.forEach((cluster) => {
			// sort the cluster by the current component
			//cluster.sort(byPlaneComponent(component, tolerance));
			Array.sort(cluster, byPlaneComponent(component, tolerance));
			// iterate through the cluster and check if there are polygons which are not coplanar with the others
			// or if there are sub-clusters of coplanar polygons
			let startIndex = 0;
			for (let i = 1; i < cluster.size(); i++) {
				// if there's a difference larger than the tolerance, split the cluster
				if (cluster[i].plane[component] - cluster[startIndex].plane[component] > tolerance) {
					// if there's a single polygon it's definitely not coplanar with any others
					if (i - startIndex === 1) {
						nonCoplanar.push(cluster[startIndex]);
					} else {
						// we have a new sub cluster of potentially coplanar polygons
						//maybeCoplanar.push(cluster.slice(startIndex, i));
						maybeCoplanar.push(Array.slice(cluster, startIndex + 1, i + 1));
					}
					startIndex = i;
				}
			}
			// handle the last elements of the cluster
			if (cluster.size() - startIndex === 1) {
				nonCoplanar.push(cluster[startIndex]);
			} else {
				//maybeCoplanar.push(cluster.slice(startIndex));
				maybeCoplanar.push(Array.slice(cluster, startIndex + 1));
			}
		});
		// replace previous clusters with the new ones
		clusters = maybeCoplanar;
	}
	// restore the original order of the polygons
	const result: Polygon[][] = [];
	// polygons inside the cluster should already be sorted by index
	clusters.forEach((cluster) => {
		//if (cluster[0]) result[cluster[0].index] = cluster;
		if (cluster[0]) {
			//DEVIATION
			Array.sort(cluster, (a, b) => a.index - b.index);
			result[cluster[0].index] = cluster;
		}
	});
	nonCoplanar.forEach((polygon) => {
		result[polygon.index] = [polygon];
	});
	return result;
};

const byPlaneComponent = (component: number, tolerance: number) => (a: Polygon, b: Polygon) => {
	if (a.plane[component] - b.plane[component] > tolerance) {
		return 1;
	} else if (b.plane[component] - a.plane[component] > tolerance) {
		return -1;
	}
	return 0;
};

export default retessellate;
