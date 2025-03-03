import type { BoundingSphere } from "./types";
import type { Vec2 } from "../maths/types";
import type { Path2, Geom2, Geom3, Slice } from "../geometries/types";
import type { RecursiveArray } from "../utils/recursiveArray";
import type { Geometry } from "../geometries/types";
import * as geom2 from "../geometries/geom2/index";
import * as geom3 from "../geometries/geom3/index";
import * as path2 from "../geometries/path2/index";
import * as poly3 from "../geometries/poly3/index";
import * as slice from "../geometries/slice/index";
import * as vec2 from "../maths/vec2/index";
import * as vec3 from "../maths/vec3/index";
import { flatten } from "../utils/flatten";

const cache = new WeakMap<Geometry, BoundingSphere>();

/**
 * Measure a geometry using a given measure function.
 * Uses cached if available. Otherwise, compute bounding sphere and save to cache.
 *
 * @param {Geometry} geometry - the geometry to measure
 * @param {Function} measureFn - the function to measure the bounding sphere
 * @return {Array[]} the centroid and radius for the geometry
 */
const measureCached = (geometry: Geometry, measureFn: (geometry: Geometry) => BoundingSphere) => {
	let boundingSphere = cache.get(geometry);
	if (boundingSphere) return boundingSphere;
	boundingSphere = measureFn(geometry);
	// if bounding sphere is undefined, default to [0,0,0] and 0
	if (boundingSphere.size() === 0) {
		boundingSphere[0] = vec3.create();
		boundingSphere[1] = 0;
	}
	cache.set(geometry, boundingSphere);
	return boundingSphere;
};

/**
 * Measure the bounding sphere of the given 2D points.
 * @return {[[x, y, z], radius]} the bounding sphere for the points
 */
const measureBoundingSphereOfPoints = (points: Vec2[]): BoundingSphere => {
	const centroid = vec3.create();
	let radius = 0;

	if (points.size() > 0) {
		// calculate the centroid of the geometry
		let numPoints = 0;
		const temp = vec3.create();
		points.forEach((point) => {
			vec3.add(centroid, centroid, vec3.fromVec2(temp, point, 0));
			numPoints++;
		});
		vec3.scale(centroid, centroid, 1 / numPoints);

		// find the farthest point from the centroid
		points.forEach((point) => {
			radius = math.max(radius, vec2.squaredDistance(centroid, point));
		});
		radius = math.sqrt(radius);
	}

	return [centroid, radius];
};

/**
 * Measure the bounding sphere of the given (path2) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfPath2 = (geometry: Geometry) =>
	measureBoundingSphereOfPoints(path2.toPoints(geometry as Path2));

/**
 * Measure the bounding sphere of the given (geom2) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */

const measureBoundingSphereOfGeom2 = (geometry: Geometry) =>
	measureBoundingSphereOfPoints(geom2.toPoints(geometry as Geom2));

/**
 * Measure the bounding sphere of the given (geom3) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfGeom3 = (geometry: Geometry): BoundingSphere => {
	const centroid = vec3.create();
	let radius = 0;

	const polygons = geom3.toPolygons(geometry as Geom3);

	if (polygons.size() > 0) {
		// calculate the centroid of the geometry
		let numVertices = 0;
		polygons.forEach((polygon) => {
			poly3.toVertices(polygon).forEach((vertex) => {
				vec3.add(centroid, centroid, vertex);
				numVertices++;
			});
		});
		vec3.scale(centroid, centroid, 1 / numVertices);

		// find the farthest vertex from the centroid
		polygons.forEach((polygon) => {
			poly3.toVertices(polygon).forEach((vertex) => {
				radius = math.max(radius, vec3.squaredDistance(centroid, vertex));
			});
		});
		radius = math.sqrt(radius);
	}

	return [centroid, radius];
};

/**
 * Measure the bounding sphere of the given (geom3) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfSlice = (geometry: Geometry | Slice): BoundingSphere => {
	const centroid = vec3.create();
	let radius = 0;
	let numVertices = 0;

	// calculate the centroid of the geometry
	(geometry as Slice).contours.forEach((contour) => {
		contour.forEach((vertex) => {
			vec3.add(centroid, centroid, vertex);
			numVertices++;
		});
	});

	if (numVertices > 0) {
		vec3.scale(centroid, centroid, 1 / numVertices);

		// find the farthest vertex from the centroid
		(geometry as Slice).contours.forEach((contour) => {
			contour.forEach((vertex) => {
				radius = math.max(radius, vec3.squaredDistance(centroid, vertex));
			});
		});
		radius = math.sqrt(radius);
	}

	return [centroid, radius];
};

/**
 * Measure the (approximate) bounding sphere of the given geometries.
 * @see https://en.wikipedia.org/wiki/Bounding_sphere
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the bounding sphere for each geometry, i.e. [centroid, radius]
 * @alias module:modeling/measurements.measureBoundingSphere
 *
 * @example
 * let bounds = measureBoundingSphere(cube())
 */
export const measureBoundingSphere = (...geometries: RecursiveArray<Geometry | Slice>) => {
	geometries = flatten(geometries);

	// DEVIATION: undefined in roblox-ts is nil, which is not iterated over in roblox-ts's array.map
	if (geometries.size() === 0) return [[0, 0, 0], 0];

	const results = (geometries as Array<Geometry>).map((geometry) => {
		if (path2.isA(geometry)) return measureCached(geometry, measureBoundingSphereOfPath2);
		if (geom2.isA(geometry)) return measureCached(geometry, measureBoundingSphereOfGeom2);
		if (geom3.isA(geometry)) return measureCached(geometry, measureBoundingSphereOfGeom3);
		if (slice.isA(geometry)) return measureCached(geometry, measureBoundingSphereOfSlice);
		return [[0, 0, 0], 0];
	});
	return results.size() === 1 ? results[0] : results;
};
