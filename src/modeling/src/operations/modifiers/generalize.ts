import { Object } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import geom3 from "../../geometries/geom3";
import path2 from "../../geometries/path2";
import measureEpsilon from "../../measurements/measureEpsilon";
import flatten from "../../utils/flatten";
import insertTjunctions from "./insertTjunctions";
import mergePolygons from "./mergePolygons";
import snapPolygons from "./snapPolygons";
import triangulatePolygons from "./triangulatePolygons";

/*
 */
const generalizePath2 = (options: GeneralizeOptions, geometry: Path2) => geometry;

/*
 */
const generalizeGeom2 = (options: GeneralizeOptions, geometry: Geom2) => geometry;

/*
 */
const generalizeGeom3 = (options: GeneralizeOptions, geometry: Geom3) => {
	const defaults = {
		snap: false,
		simplify: false,
		triangulate: false,
	};
	const { snap, simplify, triangulate } = Object.assign({}, defaults, options);

	const epsilon = measureEpsilon(geometry) as number;
	let polygons = geom3.toPolygons(geometry);

	// snap the given geometry if requested
	if (snap) {
		polygons = snapPolygons(epsilon, polygons);
	}

	// simplify the polygons if requested
	if (simplify) {
		// TODO implement some mesh decimations
		polygons = mergePolygons(epsilon, polygons);
	}

	// triangulate the polygons if requested
	if (triangulate) {
		polygons = insertTjunctions(polygons);
		polygons = triangulatePolygons(epsilon, polygons);
	}

	// FIXME replace with geom3.cloneShallow() when available
	const clone = Object.assign({}, geometry);
	clone.polygons = polygons;

	return clone;
};

type GeneralizeOptions = {
	snap?: boolean;
	simplify?: boolean;
	triangulate?: boolean;
};

/**
 * Apply various modifications in proper order to produce a generalized geometry.
 * @param {Object} options - options for modifications
 * @param {Boolean} [options.snap=false] the geometries should be snapped to epsilons
 * @param {Boolean} [options.simplify=false] the geometries should be simplified
 * @param {Boolean} [options.triangulate=false] the geometries should be triangulated
 * @param {...Object} geometries - the geometries to generalize
 * @return {Object|Array} the modified geometry, or a list of modified geometries
 * @alias module:modeling/modifiers.generalize
 */
const generalize = (options: GeneralizeOptions, ...geometries: object[]): object | object[] => {
	geometries = flatten(geometries);
	if (geometries.size() === 0) throw error("wrong number of arguments");

	const results: object[] = geometries.map((geometry) => {
		if (path2.isA(geometry)) return generalizePath2(options, geometry as Path2);
		if (geom2.isA(geometry)) return generalizeGeom2(options, geometry as Geom2);
		if (geom3.isA(geometry)) return generalizeGeom3(options, geometry as Geom3);
		throw error("invalid geometry");
	});
	return results.size() === 1 ? results[0] : results;
};

export default generalize;
