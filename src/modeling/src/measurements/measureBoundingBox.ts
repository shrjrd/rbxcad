import geom2 from "../geometries/geom2";
import geom3 from "../geometries/geom3";
import path2 from "../geometries/path2";
import poly3 from "../geometries/poly3";
import vec2 from "../maths/vec2";
import vec3 from "../maths/vec3";
import flatten from "../utils/flatten";

const cache = new WeakMap();

/*
 * Measure the min and max bounds of the given (path2) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfPath2 = (geometry: Path2) => {
	let boundingBox = cache.get(geometry) as BoundingBox;
	if (boundingBox) return boundingBox;

	const points = path2.toPoints(geometry);

	let minpoint: Vec2;
	if (points.size() === 0) {
		minpoint = vec2.create();
	} else {
		minpoint = vec2.clone(points[0]);
	}
	let maxpoint = vec2.clone(minpoint);

	points.forEach((point) => {
		vec2.min(minpoint, minpoint, point);
		vec2.max(maxpoint, maxpoint, point);
	});
	minpoint = [minpoint[0], minpoint[1], 0];
	maxpoint = [maxpoint[0], maxpoint[1], 0];

	boundingBox = [minpoint as Vec3, maxpoint as Vec3];

	cache.set(geometry, boundingBox);

	return boundingBox;
};

/*
 * Measure the min and max bounds of the given (geom2) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfGeom2 = (geometry: Geom2) => {
	let boundingBox = cache.get(geometry) as BoundingBox;
	if (boundingBox) return boundingBox;

	const points = geom2.toPoints(geometry);

	let minpoint: Vec2;
	if (points.size() === 0) {
		minpoint = vec2.create();
	} else {
		minpoint = vec2.clone(points[0]);
	}
	let maxpoint = vec2.clone(minpoint);

	points.forEach((point) => {
		vec2.min(minpoint, minpoint, point);
		vec2.max(maxpoint, maxpoint, point);
	});

	minpoint = [minpoint[0], minpoint[1], 0];
	maxpoint = [maxpoint[0], maxpoint[1], 0];

	boundingBox = [minpoint as Vec3, maxpoint as Vec3];

	cache.set(geometry, boundingBox);

	return boundingBox;
};

/*
 * Measure the min and max bounds of the given (geom3) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfGeom3 = (geometry: Geom3) => {
	let boundingBox = cache.get(geometry) as BoundingBox;
	if (boundingBox) return boundingBox;

	const polygons = geom3.toPolygons(geometry);

	let minpoint = vec3.create();
	if (polygons.size() > 0) {
		const points = poly3.toPoints(polygons[0]);
		vec3.copy(minpoint, points[0]);
	}
	let maxpoint = vec3.clone(minpoint);

	polygons.forEach((polygon) => {
		poly3.toPoints(polygon).forEach((point) => {
			vec3.min(minpoint, minpoint, point);
			vec3.max(maxpoint, maxpoint, point);
		});
	});

	minpoint = [minpoint[0], minpoint[1], minpoint[2]];
	maxpoint = [maxpoint[0], maxpoint[1], maxpoint[2]];

	boundingBox = [minpoint, maxpoint];

	cache.set(geometry, boundingBox);

	return boundingBox;
};

/**
 * Measure the min and max bounds of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the min and max bounds, or a list of bounds for each geometry
 * @alias module:modeling/measurements.measureBoundingBox
 *
 * @example
 * let bounds = measureBoundingBox(sphere())
 */
const measureBoundingBox = (...geometries: object[]): BoundingBox | BoundingBox[] => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) {
		//throw new Error("wrong number of arguments");
		//warn("wrong number of arguments");
		return [
			[0, 0, 0],
			[0, 0, 0],
		] as BoundingBox;
	}

	const results = geometries.map((geometry) => {
		if (path2.isA(geometry)) return measureBoundingBoxOfPath2(geometry as Path2);
		if (geom2.isA(geometry)) return measureBoundingBoxOfGeom2(geometry as Geom2);
		if (geom3.isA(geometry)) return measureBoundingBoxOfGeom3(geometry as Geom3);
		return [
			[0, 0, 0],
			[0, 0, 0],
		] as BoundingBox;
	});
	return results.size() === 1 ? results[0] : results;
};

export default measureBoundingBox;
