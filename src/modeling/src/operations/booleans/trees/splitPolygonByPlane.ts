import { Array as JsArray } from "@rbxts/luau-polyfill";

import poly3 from "../../../geometries/poly3";
import { EPS } from "../../../maths/constants";
import plane from "../../../maths/plane";
import vec3 from "../../../maths/vec3";
import splitLineSegmentByPlane from "./splitLineSegmentByPlane";

// Returns object:
// .type:
//   0: coplanar-front
//   1: coplanar-back
//   2: front
//   3: back
//   4: spanning
// In case the polygon is spanning, returns:
// .front: a Polygon3 of the front part
// .back: a Polygon3 of the back part
const splitPolygonByPlane = (splane: _Plane, polygon: Poly3) => {
	const result: {
		type: 0 | 1 | 2 | 3 | 4;
		front: Poly3;
		back: Poly3;
	} = {
		type: undefined!,
		front: undefined!,
		back: undefined!,
	};
	// cache in local lets (speedup):
	const vertices = polygon.vertices;
	const numvertices = vertices.size();
	const pplane = poly3.plane(polygon);
	if (plane.equals(pplane, splane)) {
		result.type = 0;
	} else {
		let hasfront = false;
		let hasback = false;
		const vertexIsBack = [];
		const MINEPS = -EPS;
		for (let i = 0; i < numvertices; i++) {
			const t = vec3.dot(splane, vertices[i]) - splane[3];
			const isback = t < MINEPS;
			vertexIsBack.push(isback);
			if (t > EPS) hasfront = true;
			if (t < MINEPS) hasback = true;
		}
		if (!hasfront && !hasback) {
			// all points coplanar
			const t = vec3.dot(splane, pplane);
			result.type = t >= 0 ? 0 : 1;
		} else if (!hasback) {
			result.type = 2;
		} else if (!hasfront) {
			result.type = 3;
		} else {
			// spanning
			result.type = 4;
			const frontvertices = [];
			const backvertices = [];
			let isback = vertexIsBack[0];
			for (let vertexindex = 0; vertexindex < numvertices; vertexindex++) {
				const vertex = vertices[vertexindex];
				let nextvertexindex = vertexindex + 1;
				if (nextvertexindex >= numvertices) nextvertexindex = 0;
				const nextisback = vertexIsBack[nextvertexindex];
				if (isback === nextisback) {
					// line segment is on one side of the plane:
					if (isback) {
						backvertices.push(vertex);
					} else {
						frontvertices.push(vertex);
					}
				} else {
					// line segment intersects plane:
					const nextpoint = vertices[nextvertexindex];
					const intersectionpoint = splitLineSegmentByPlane(splane, vertex, nextpoint);
					if (isback) {
						backvertices.push(vertex);
						backvertices.push(intersectionpoint);
						frontvertices.push(intersectionpoint);
					} else {
						frontvertices.push(vertex);
						frontvertices.push(intersectionpoint);
						backvertices.push(intersectionpoint);
					}
				}
				isback = nextisback;
			} // for vertexindex
			// remove duplicate vertices:
			const EPS_SQUARED = EPS * EPS;
			if (backvertices.size() >= 3) {
				let prevvertex = backvertices[backvertices.size() - 1];
				for (let vertexindex = 0; vertexindex < backvertices.size(); vertexindex++) {
					const vertex = backvertices[vertexindex];
					if (vec3.squaredDistance(vertex, prevvertex) < EPS_SQUARED) {
						//backvertices.splice(vertexindex, 1);
						JsArray.splice(backvertices, vertexindex + 1, 1);
						vertexindex--;
					}
					prevvertex = vertex;
				}
			}
			if (frontvertices.size() >= 3) {
				let prevvertex = frontvertices[frontvertices.size() - 1];
				for (let vertexindex = 0; vertexindex < frontvertices.size(); vertexindex++) {
					const vertex = frontvertices[vertexindex];
					if (vec3.squaredDistance(vertex, prevvertex) < EPS_SQUARED) {
						//frontvertices.splice(vertexindex, 1);
						JsArray.splice(frontvertices, vertexindex + 1, 1);
						vertexindex--;
					}
					prevvertex = vertex;
				}
			}
			if (frontvertices.size() >= 3) {
				result.front = poly3.fromPointsAndPlane(frontvertices, pplane);
			}
			if (backvertices.size() >= 3) {
				result.back = poly3.fromPointsAndPlane(backvertices, pplane);
			}
		}
	}
	return result;
};

export default splitPolygonByPlane;
