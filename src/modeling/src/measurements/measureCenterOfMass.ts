import geom2 from "../geometries/geom2";
import geom3 from "../geometries/geom3";
import vec3 from "../maths/vec3";
import flatten from "../utils/flatten";

const cacheOfCenterOfMass = new WeakMap();

/*
 * Measure the center of mass for the given geometry.
 *
 * @see http://paulbourke.net/geometry/polygonmesh/
 * @return {Array} the center of mass for the geometry
 */
const measureCenterOfMassGeom2 = (geometry: Geom2) => {
	let centerOfMass = cacheOfCenterOfMass.get(geometry) as Vec3;
	if (centerOfMass !== undefined) return centerOfMass;

	const sides = geom2.toSides(geometry);

	let area = 0;
	let x = 0;
	let y = 0;
	if (sides.size() > 0) {
		for (let i = 0; i < sides.size(); i++) {
			const p1 = sides[i][0];
			const p2 = sides[i][1];

			const a = p1[0] * p2[1] - p1[1] * p2[0];
			area += a;
			x += (p1[0] + p2[0]) * a;
			y += (p1[1] + p2[1]) * a;
		}
		area /= 2;

		const f = 1 / (area * 6);
		x *= f;
		y *= f;
	}

	centerOfMass = vec3.fromValues(x, y, 0);

	cacheOfCenterOfMass.set(geometry, centerOfMass);
	return centerOfMass;
};

/*
 * Measure the center of mass for the given geometry.
 * @return {Array} the center of mass for the geometry
 */
const measureCenterOfMassGeom3 = (geometry: Geom3) => {
	let centerOfMass = cacheOfCenterOfMass.get(geometry) as Vec3;
	if (centerOfMass !== undefined) return centerOfMass;

	centerOfMass = vec3.create(); // 0, 0, 0

	const polygons = geom3.toPolygons(geometry);
	if (polygons.size() === 0) return centerOfMass;

	let totalVolume = 0;
	const vector = vec3.create(); // for speed
	polygons.forEach((polygon) => {
		// calculate volume and center of each tetrahedron
		const vertices = polygon.vertices;
		for (let i = 0; i < vertices.size() - 2; i++) {
			vec3.cross(vector, vertices[i + 1], vertices[i + 2]);
			const volume = vec3.dot(vertices[0], vector) / 6;

			totalVolume += volume;

			vec3.add(vector, vertices[0], vertices[i + 1]);
			vec3.add(vector, vector, vertices[i + 2]);
			const weightedCenter = vec3.scale(vector, vector, (1 / 4) * volume);

			vec3.add(centerOfMass, centerOfMass, weightedCenter);
		}
	});
	vec3.scale(centerOfMass, centerOfMass, 1 / totalVolume);

	cacheOfCenterOfMass.set(geometry, centerOfMass);
	return centerOfMass;
};

/**
 * Measure the center of mass for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the center of mass for each geometry, i.e. [X, Y, Z]
 * @alias module:modeling/measurements.measureCenterOfMass
 *
 * @example
 * let center = measureCenterOfMass(sphere())
 */
const measureCenterOfMass = (...geometries: object[]) => {
	geometries = flatten(geometries);

	if (geometries.size() === 0) {
		//warn("wrong number of arguments");
		return [0, 0, 0];
	}

	const results = geometries.map((geometry) => {
		// NOTE: center of mass for geometry path2 is not possible
		if (geom2.isA(geometry)) return measureCenterOfMassGeom2(geometry as Geom2);
		if (geom3.isA(geometry)) return measureCenterOfMassGeom3(geometry as Geom3);
		return [0, 0, 0];
	});
	return results.size() === 1 ? results[0] : results;
};

export default measureCenterOfMass;
