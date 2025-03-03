import type { Geom2, Geom3 } from "../../geometries/types";
import type { RecursiveArray } from "../../utils/recursiveArray";
import type { Vec3 } from "../../maths/types";

export interface ProjectOptions {
	axis?: Vec3;
	origin?: Vec3;
}
import { Array as JsArray, Number, Object } from "@rbxts/luau-polyfill";

import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import * as poly3 from "../../geometries/poly3/index";
import * as mat4 from "../../maths/mat4/index";
import * as plane from "../../maths/plane/index";
import { aboutEqualNormals } from "../../maths/utils/aboutEqualNormals";
import * as vec2 from "../../maths/vec2/index";
import { measureEpsilon } from "../../measurements/measureEpsilon";
import { unionGeom2 } from "../booleans/unionGeom2";

const projectGeom3 = (options: ProjectOptions, geometry: Geom3) => {
	// create a plane from the options, and verify
	const projPlane = plane.fromNormalAndPoint(plane.create(), options.axis!, options.origin!);
	if (
		Number.isNaN(projPlane[0]) ||
		Number.isNaN(projPlane[1]) ||
		Number.isNaN(projPlane[2]) ||
		Number.isNaN(projPlane[3])
	) {
		throw "project: invalid axis or origin";
	}

	const epsilon = measureEpsilon(geometry) as number;
	const epsilonArea = (epsilon * epsilon * math.sqrt(3)) / 4;

	if (epsilon === 0) return geom2.create();

	// project the polygons to the plane
	const polygons = geom3.toPolygons(geometry);
	let projPolys = [];
	for (let i = 0; i < polygons.size(); i++) {
		const newVertices = polygons[i].vertices.map((v) => plane.projectionOfPoint(projPlane, v));
		const newPoly = poly3.create(newVertices);
		// only keep projections that face the same direction as the plane
		const newPlane = poly3.plane(newPoly);
		if (!aboutEqualNormals(projPlane, newPlane)) continue;
		// only keep projections that have a measurable area
		if (poly3.measureArea(newPoly) < epsilonArea) continue;
		projPolys.push(newPoly);
	}

	// rotate the polygons to lay on X/Y axes if necessary
	if (!aboutEqualNormals(projPlane, [0, 0, 1])) {
		const rotation = mat4.fromVectorRotation(mat4.create(), projPlane, [0, 0, 1]);
		projPolys = projPolys.map((p) => poly3.transform(rotation, p));
	}

	// sort the polygons to allow the union to ignore small pieces efficiently
	//projPolys = projPolys.sort((a, b) => poly3.measureArea(b) - poly3.measureArea(a));
	projPolys = JsArray.sort(projPolys, (a, b) => poly3.measureArea(b) - poly3.measureArea(a));

	// convert polygons to geometry, and union all pieces into a single geometry
	const projGeoms = projPolys.map((p) => {
		// This clones the points from vec3 to vec2
		const cloned = p.vertices.map(vec2.clone);
		return geom2.create([cloned]);
	});

	const output = unionGeom2(projGeoms);
	if (geometry.color) output.color = geometry.color;
	return output;
};

/**
 * Project the given 3D geometry on to the given plane.
 * @param {object} options - options for project
 * @param {Array} [options.axis=[0,0,1]] the axis of the plane (default is Z axis)
 * @param {Array} [options.origin=[0,0,0]] the origin of the plane
 * @param {...Object} objects - the list of 3D geometry to project
 * @return {Geom2|Array} the projected 2D geometry, or a list of 2D projected geometry
 * @alias module:modeling/extrusions.project
 *
 * @example
 * let myshape = project({}, sphere({radius: 20, segments: 5}))
 */
export const project = (
	options: {
		axis?: Vec3;
		origin?: Vec3;
	},
	...objects: RecursiveArray<Geom3>
) => {
	const defaults = {
		axis: [0, 0, 1], // Z axis
		origin: [0, 0, 0],
	};
	const { axis, origin } = Object.assign({}, defaults, options);

	options = { axis, origin };

	const results = objects.map((object) => {
		// if (path.isA(object)) return project(options, object)
		// if (geom2.isA(object)) return project(options, object)
		if (geom3.isA(object)) return projectGeom3(options, object as Geom3);
		if (JsArray.isArray(object)) return project(options, ...object);
		return object;
	}) as Geom2[];
	return results.size() === 1 ? results[0] : results;
};
