import { Array as JsArray, Number, Object } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import geom3 from "../../geometries/geom3";
import poly3 from "../../geometries/poly3";
import mat4 from "../../maths/mat4";
import plane from "../../maths/plane";
import aboutEqualNormals from "../../maths/utils/aboutEqualNormals";
import measureEpsilon from "../../measurements/measureEpsilon";
import flatten from "../../utils/flatten";
import unionGeom2 from "../booleans/unionGeom2";

const projectGeom3 = (options: { axis: Vec3; origin: Vec3 }, geometry: Geom3) => {
	// create a plane from the options, and verify
	const projplane = plane.fromNormalAndPoint(plane.create(), options.axis, options.origin);
	if (
		Number.isNaN(projplane[0]) ||
		Number.isNaN(projplane[1]) ||
		Number.isNaN(projplane[2]) ||
		Number.isNaN(projplane[3])
	) {
		error("project: invalid axis or origin");
	}

	const epsilon = measureEpsilon(geometry) as number;
	const epsilonArea = (epsilon * epsilon * math.sqrt(3)) / 4;

	if (epsilon === 0) return geom2.create();

	// project the polygons to the plane
	const polygons = geom3.toPolygons(geometry);
	let projpolys = [];
	for (let i = 0; i < polygons.size(); i++) {
		const newpoints = polygons[i].vertices.map((v) => plane.projectionOfPoint(projplane, v));
		const newpoly = poly3.create(newpoints);
		// only keep projections that face the same direction as the plane
		const newplane = poly3.plane(newpoly);
		if (!aboutEqualNormals(projplane, newplane)) continue;
		// only keep projections that have a measurable area
		if (poly3.measureArea(newpoly) < epsilonArea) continue;
		projpolys.push(newpoly);
	}

	// rotate the polygons to lay on X/Y axes if necessary
	if (!aboutEqualNormals(projplane, [0, 0, 1])) {
		const rotation = mat4.fromVectorRotation(mat4.create(), projplane, [0, 0, 1]);
		projpolys = projpolys.map((p) => poly3.transform(rotation, p));
	}

	// sort the polygons to allow the union to ignore small pieces efficiently
	//projpolys = projpolys.sort((a, b) => poly3.measureArea(b) - poly3.measureArea(a));
	JsArray.sort(projpolys, (a, b) => poly3.measureArea(b) - poly3.measureArea(a));

	// convert polygons to geometry, and union all pieces into a single geometry
	const projgeoms = projpolys.map((p) => geom2.fromPoints(p.vertices));
	return unionGeom2(...projgeoms);
};

/**
 * Project the given 3D geometry on to the given plane.
 * @param {Object} options - options for project
 * @param {Array} [options.axis=[0,0,1]] the axis of the plane (default is Z axis)
 * @param {Array} [options.origin=[0,0,0]] the origin of the plane
 * @param {...Object} objects - the list of 3D geometry to project
 * @return {geom2|Array} the projected 2D geometry, or a list of 2D projected geometry
 * @alias module:modeling/extrusions.project
 *
 * @example
 * let myshape = project({}, sphere({radius: 20, segments: 5}))
 */
const project = (options: { axis?: Vec3; origin?: Vec3 }, ...objects: Geom3[]): Geom2 | Geom2[] => {
	const defaults = {
		axis: [0, 0, 1], // Z axis
		origin: [0, 0, 0],
	};
	const { axis, origin } = Object.assign({}, defaults, options);

	objects = flatten(objects);
	if (objects.size() === 0) error("wrong number of arguments");

	options = { axis, origin };

	const results = objects.map((object) => {
		// if (path.isA(object)) return project(options, object)
		// if (geom2.isA(object)) return project(options, object)
		if (geom3.isA(object)) return projectGeom3(options as { axis: Vec3; origin: Vec3 }, object);
		return object;
	}) as Geom2[];
	return results.size() === 1 ? results[0] : results;
};

export default project;
