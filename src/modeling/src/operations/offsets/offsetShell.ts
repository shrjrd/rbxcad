import type { Vec3, Vec4, Plane } from "../../maths/types";
import type { Geom3 } from "../../geometries/types";
import { Array as JsArray, JsMap, Object } from "@rbxts/luau-polyfill";
const Vec3ToString = (vec: Vec3) => `${vec[0]},${vec[1]},${vec[2]}`;

import * as geom3 from "../../geometries/geom3/index";
import * as poly3 from "../../geometries/poly3/index";
import { EPS, TAU } from "../../maths/constants";
import * as mat4 from "../../maths/mat4/index";
import * as vec3 from "../../maths/vec3/index";
import { sphere } from "../../primitives/sphere";
import { fnNumberSort } from "../../utils/fnNumberSort";
import { unionGeom3Sub } from "../booleans/unionGeom3Sub";
import { retessellate } from "../modifiers/retessellate";
import { extrudePolygon } from "./extrudePolygon";

/**
 * Collect all planes adjacent to each vertex
 */
const mapPlaneToVertex = (map: InstanceType<typeof JsMap<string, [Vec3, [Vec4]]>>, vertex: Vec3, plane: Plane) => {
	const key = Vec3ToString(vertex); //vertex.toString();
	if (!map.has(key)) {
		const entry: [Vec3, [Vec4]] = [vertex, [plane]];
		map.set(key, entry);
	} else {
		const planes = map.get(key)![1];
		planes.push(plane);
	}
};

/**
 * Collect all planes adjacent to each edge.
 * Combine undirected edges, no need for duplicate cylinders.
 */
const mapPlaneToEdge = (map: InstanceType<typeof JsMap<string, [Vec3[], [Vec4]]>>, edge: Vec3[], plane: Plane) => {
	const key0 = Vec3ToString(edge[0]); //edge[0].toString();
	const key1 = Vec3ToString(edge[1]); //edge[1].toString();
	// Sort keys to make edges undirected
	const key = key0 < key1 ? `${key0},${key1}` : `${key1},${key0}`;
	if (!map.has(key)) {
		const entry: [Vec3[], [Vec4]] = [edge, [plane]];
		map.set(key, entry);
	} else {
		const planes = map.get(key)![1];
		planes.push(plane);
	}
};

const addUniqueAngle = (map: number[], angle: number) => {
	const i = map.findIndex((item) => item === angle);
	if (i < 0) {
		map.push(angle);
	}
};

/**
 * Create the expanded shell of the solid:
 * All faces are extruded to 2 times delta
 * Cylinders are constructed around every side
 * Spheres are placed on every vertex
 * the result is a true expansion of the solid
 * @param  {number} delta
 * @param  {number} segments
 */
export const offsetShell = (options: { delta?: number; segments?: number }, geometry: Geom3) => {
	const defaults = {
		delta: 1,
		segments: 12,
	};
	const { delta, segments } = Object.assign({}, defaults, options);

	let result = geom3.create();
	const vertices2planes = new JsMap<string, [Vec3, [Vec4]]>(); // {vertex: [vertex, [plane, ...]]}
	const edges2planes = new JsMap<string, [Vec3[], [Vec4]]>(); // {edge: [[vertex, vertex], [plane, ...]]}

	const v1 = vec3.create();
	const v2 = vec3.create();

	// loop through the polygons
	// - extruded the polygon, and add to the composite result
	// - add the plane to the unique vertex map
	// - add the plane to the unique edge map
	const polygons = geom3.toPolygons(geometry);
	polygons.forEach((polygon) => {
		const extrudeVector = vec3.scale(vec3.create(), poly3.plane(polygon), 2 * delta);
		const translatedPolygon = poly3.transform(
			mat4.fromTranslation(mat4.create(), vec3.scale(vec3.create(), extrudeVector, -0.5)),
			polygon,
		);
		const extrudedFace = extrudePolygon(extrudeVector, translatedPolygon);
		result = unionGeom3Sub(result, extrudedFace);

		const vertices = polygon.vertices;
		for (let i = 0; i < vertices.size(); i++) {
			mapPlaneToVertex(vertices2planes, vertices[i], poly3.plane(polygon));
			const j = (i + 1) % vertices.size();
			const edge = [vertices[i], vertices[j]];
			mapPlaneToEdge(edges2planes, edge, poly3.plane(polygon));
		}
	});

	// now construct a cylinder on every side
	// The cylinder is always an approximation of a true cylinder, having polygons
	// around the sides. We will make sure though that the cylinder will have an edge at every
	// face that touches this side. This ensures that we will get a smooth fill even
	// if two edges are at, say, 10 degrees and the segments is low.
	edges2planes.forEach((item) => {
		const edge = item[0];
		const planes = item[1];
		const startVertex = edge[0];
		const endVertex = edge[1];

		// our x,y and z vectors:
		const zBase = vec3.subtract(vec3.create(), endVertex, startVertex);
		vec3.normalize(zBase, zBase);
		const xBase = planes[0];
		const yBase = vec3.cross(vec3.create(), xBase, zBase);

		// make a list of angles that the cylinder should traverse:
		let angles: number[] = [];

		// first of all equally spaced around the cylinder:
		for (let i = 0; i < segments; i++) {
			addUniqueAngle(angles, (i * TAU) / segments);
		}

		// and also at every normal of all touching planes:
		for (let i = 0, iMax = planes.size(); i < iMax; i++) {
			const planeNormal = planes[i];
			const si = vec3.dot(yBase, planeNormal);
			const co = vec3.dot(xBase, planeNormal);
			let angle = math.atan2(si, co);

			if (angle < 0) angle += TAU;
			addUniqueAngle(angles, angle);
			angle = math.atan2(-si, -co);
			if (angle < 0) angle += TAU;
			addUniqueAngle(angles, angle);
		}

		// this will result in some duplicate angles but we will get rid of those later.
		angles = JsArray.sort(angles, fnNumberSort); //angles = angles.sort(fnNumberSort);

		// Now construct the cylinder by traversing all angles:
		const numAngles = angles.size();
		let prevP1: Vec3 = undefined!;
		let prevP2: Vec3 = undefined!;
		const startFaceVertices = [];
		const endFaceVertices = [];
		const polygons = [];
		for (let i = -1; i < numAngles; i++) {
			const angle = angles[i < 0 ? i + numAngles : i];
			const si = math.sin(angle);
			const co = math.cos(angle);
			vec3.scale(v1, xBase, co * delta);
			vec3.scale(v2, yBase, si * delta);
			vec3.add(v1, v1, v2);
			const p1 = vec3.add(vec3.create(), startVertex, v1);
			const p2 = vec3.add(vec3.create(), endVertex, v1);
			let skip = false;
			if (i >= 0) {
				if (vec3.distance(p1, prevP1) < EPS) {
					skip = true;
				}
			}
			if (!skip) {
				if (i >= 0) {
					startFaceVertices.push(p1);
					endFaceVertices.push(p2);
					const vertices = [prevP2, p2, p1, prevP1];
					const polygon = poly3.create(vertices);
					polygons.push(polygon);
				}
				prevP1 = p1;
				prevP2 = p2;
			}
		}
		JsArray.reverse(endFaceVertices); //endFaceVertices.reverse();
		polygons.push(poly3.create(startFaceVertices));
		polygons.push(poly3.create(endFaceVertices));

		const cylinder = geom3.create(polygons);
		result = unionGeom3Sub(result, cylinder);
	});

	// build spheres at each unique vertex
	// We will try to set the x and z axis to the normals of 2 planes
	// This will ensure that our sphere tesselation somewhat matches 2 planes
	vertices2planes.forEach((item) => {
		const vertex = item[0];
		const planes = item[1];
		// use the first normal to be the x axis of our sphere:
		const xaxis = planes[0];
		// and find a suitable z axis. We will use the normal which is most perpendicular to the x axis:
		let bestzaxis = undefined;
		let bestzaxisOrthogonality = 0;
		for (let i = 1; i < planes.size(); i++) {
			const normal = planes[i];
			const cross = vec3.cross(v1, xaxis, normal);
			const crossLength = vec3.length(cross);
			if (crossLength > 0.05) {
				// FIXME why 0.05?
				if (crossLength > bestzaxisOrthogonality) {
					bestzaxisOrthogonality = crossLength;
					bestzaxis = normal;
				}
			}
		}
		if (!bestzaxis) {
			bestzaxis = vec3.orthogonal(v1, xaxis);
		}
		const yaxis = vec3.cross(v1, xaxis, bestzaxis);
		vec3.normalize(yaxis, yaxis);
		const zaxis = vec3.cross(v2, yaxis, xaxis);
		const corner = sphere({
			center: [vertex[0], vertex[1], vertex[2]],
			radius: delta,
			segments: segments,
			axes: [xaxis, yaxis, zaxis],
		});
		result = unionGeom3Sub(result, corner);
	});
	return retessellate(result);
};
