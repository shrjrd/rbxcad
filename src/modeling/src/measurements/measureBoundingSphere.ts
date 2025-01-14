import geom2 from "../geometries/geom2";
import geom3 from "../geometries/geom3";
import path2 from "../geometries/path2";
import poly3 from "../geometries/poly3";
import vec2 from "../maths/vec2";
import vec3 from "../maths/vec3";
import flatten from "../utils/flatten";

const cacheOfBoundingSpheres = new WeakMap();

/*
 * Measure the bounding sphere of the given (path2) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfPath2 = (geometry: Path2) => {
	let boundingSphere = cacheOfBoundingSpheres.get(geometry) as [Vec3, number];
	if (boundingSphere !== undefined) return boundingSphere;

	const centroid = vec3.create();
	let radius = 0;

	const points = path2.toPoints(geometry);

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

	boundingSphere = [centroid, radius];
	cacheOfBoundingSpheres.set(geometry, boundingSphere);

	return boundingSphere;
};

/*
 * Measure the bounding sphere of the given (geom2) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfGeom2 = (geometry: Geom2) => {
	let boundingSphere = cacheOfBoundingSpheres.get(geometry) as [Vec3, number];
	if (boundingSphere !== undefined) return boundingSphere;

	const centroid = vec3.create();
	let radius = 0;

	const sides = geom2.toSides(geometry);

	if (sides.size() > 0) {
		// calculate the centroid of the geometry
		let numPoints = 0;
		const temp = vec3.create();
		sides.forEach((side) => {
			vec3.add(centroid, centroid, vec3.fromVec2(temp, side[0], 0));
			numPoints++;
		});
		vec3.scale(centroid, centroid, 1 / numPoints);

		// find the farthest point from the centroid
		sides.forEach((side) => {
			radius = math.max(radius, vec2.squaredDistance(centroid, side[0]));
		});
		radius = math.sqrt(radius);
	}

	boundingSphere = [centroid, radius];
	cacheOfBoundingSpheres.set(geometry, boundingSphere);

	return boundingSphere;
};

/*
 * Measure the bounding sphere of the given (geom3) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfGeom3 = (geometry: Geom3) => {
	let boundingSphere = cacheOfBoundingSpheres.get(geometry) as [Vec3, number];
	if (boundingSphere !== undefined) return boundingSphere;

	const centroid = vec3.create();
	let radius = 0;

	const polygons = geom3.toPolygons(geometry);

	if (polygons.size() > 0) {
		// calculate the centroid of the geometry
		let numPoints = 0;
		polygons.forEach((polygon) => {
			poly3.toPoints(polygon).forEach((point) => {
				vec3.add(centroid, centroid, point);
				numPoints++;
			});
		});
		vec3.scale(centroid, centroid, 1 / numPoints);

		// find the farthest point from the centroid
		polygons.forEach((polygon) => {
			poly3.toPoints(polygon).forEach((point) => {
				radius = math.max(radius, vec3.squaredDistance(centroid, point));
			});
		});
		radius = math.sqrt(radius);
	}

	boundingSphere = [centroid, radius];
	cacheOfBoundingSpheres.set(geometry, boundingSphere);

	return boundingSphere;
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
const measureBoundingSphere = (...geometries: object[]) => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) {
		//warn("wrong number of arguments");
		return [[0, 0, 0], 0] as [Vec3, number];
	}

	const results = geometries.map((geometry) => {
		if (path2.isA(geometry)) return measureBoundingSphereOfPath2(geometry as Path2);
		if (geom2.isA(geometry)) return measureBoundingSphereOfGeom2(geometry as Geom2);
		if (geom3.isA(geometry)) return measureBoundingSphereOfGeom3(geometry as Geom3);
		return [[0, 0, 0], 0] as [Vec3, number];
	});
	return results.size() === 1 ? results[0] : results;
};

export default measureBoundingSphere;
