import type { Poly3 } from "../../../geometries/types";
import type { Plane } from "../../../maths/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

enum ResType {
	coplanar_front = 0,
	coplanar_back = 1,
	front = 2,
	back = 3,
	spanning = 4,
}

interface SplitRes {
	type: ResType;
	front: Poly3;
	back: Poly3;
}

import * as poly3 from "../../../geometries/poly3/index";
import { EPS } from "../../../maths/constants";
import * as plane from "../../../maths/plane/index";
import * as vec3 from "../../../maths/vec3/index";
import { splitLineSegmentByPlane } from "./splitLineSegmentByPlane";

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
export const splitPolygonByPlane = (
	result: { type: number; front?: Poly3; back?: Poly3 },
	splane: Plane,
	polygon: Poly3,
) => {
	// clear previous result
	result.type = 0;
	result.front = undefined;
	result.back = undefined;
	// cache in local lets (speedup):
	const vertices = polygon.vertices;
	const numVertices = vertices.size();
	const pplane = poly3.plane(polygon);
	if (plane.equals(pplane, splane)) {
		result.type = 0;
	} else {
		let hasFront = false;
		let hasBack = false;
		const vertexIsBack = [];
		const MINEPS = -EPS;
		for (let i = 0; i < numVertices; i++) {
			const t = vec3.dot(splane, vertices[i]) - splane[3];
			const isback = t < MINEPS;
			vertexIsBack.push(isback);
			if (t > EPS) hasFront = true;
			if (t < MINEPS) hasBack = true;
		}
		if (!hasFront && !hasBack) {
			// all points coplanar
			const t = vec3.dot(splane, pplane);
			result.type = t >= 0 ? 0 : 1;
		} else if (!hasBack) {
			result.type = 2;
		} else if (!hasFront) {
			result.type = 3;
		} else {
			// spanning
			result.type = 4;
			const frontVertices = [];
			const backVertices = [];
			let isback = vertexIsBack[0];
			for (let vertexIndex = 0; vertexIndex < numVertices; vertexIndex++) {
				const vertex = vertices[vertexIndex];
				let nextVertexIndex = vertexIndex + 1;
				if (nextVertexIndex >= numVertices) nextVertexIndex = 0;
				const nextIsBack = vertexIsBack[nextVertexIndex];
				if (isback === nextIsBack) {
					// line segment is on one side of the plane:
					if (isback) {
						backVertices.push(vertex);
					} else {
						frontVertices.push(vertex);
					}
				} else {
					// line segment intersects plane:
					const nextPoint = vertices[nextVertexIndex];
					const intersectionPoint = splitLineSegmentByPlane(splane, vertex, nextPoint);
					if (isback) {
						backVertices.push(vertex);
						backVertices.push(intersectionPoint);
						frontVertices.push(intersectionPoint);
					} else {
						frontVertices.push(vertex);
						frontVertices.push(intersectionPoint);
						backVertices.push(intersectionPoint);
					}
				}
				isback = nextIsBack;
			} // for vertexIndex
			// remove duplicate vertices:
			const EPS_SQUARED = EPS * EPS;
			if (backVertices.size() >= 3) {
				let prevVertex = backVertices[backVertices.size() - 1];
				for (let vertexIndex = 0; vertexIndex < backVertices.size(); vertexIndex++) {
					const vertex = backVertices[vertexIndex];
					if (vec3.squaredDistance(vertex, prevVertex) < EPS_SQUARED) {
						JsArray.splice(backVertices, vertexIndex + 1, 1); //backVertices.splice(vertexIndex, 1);
						vertexIndex--;
					}
					prevVertex = vertex;
				}
			}
			if (frontVertices.size() >= 3) {
				let prevVertex = frontVertices[frontVertices.size() - 1];
				for (let vertexIndex = 0; vertexIndex < frontVertices.size(); vertexIndex++) {
					const vertex = frontVertices[vertexIndex];
					if (vec3.squaredDistance(vertex, prevVertex) < EPS_SQUARED) {
						JsArray.splice(frontVertices, vertexIndex + 1, 1); //frontVertices.splice(vertexIndex, 1);
						vertexIndex--;
					}
					prevVertex = vertex;
				}
			}
			if (frontVertices.size() >= 3) {
				result.front = poly3.fromVerticesAndPlane(frontVertices, pplane);
			}
			if (backVertices.size() >= 3) {
				result.back = poly3.fromVerticesAndPlane(backVertices, pplane);
			}
		}
	}
	return result;
};
