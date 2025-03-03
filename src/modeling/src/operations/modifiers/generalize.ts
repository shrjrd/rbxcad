import type { Geometry, Geom2, Geom3, Path2 } from "../../geometries/types";
import type { RecursiveArray } from "../../utils/recursiveArray";

export interface GeneralizeOptions {
	snap?: boolean;
	simplify?: boolean;
	triangulate?: boolean;
}

import { Array as JsArray, Object } from "@rbxts/luau-polyfill";

import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import * as path2 from "../../geometries/path2/index";
import { measureEpsilon } from "../../measurements/measureEpsilon";
import { insertTjunctions } from "./insertTjunctions";
import { mergePolygons } from "./mergePolygons";
import { snapPolygons } from "./snapPolygons";
import { triangulatePolygons } from "./triangulatePolygons";

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

/**
 * Apply various modifications in proper order to produce a generalized geometry.
 * @param {object} options - options for modifications
 * @param {boolean} [options.snap=false] the geometries should be snapped to epsilons
 * @param {boolean} [options.simplify=false] the geometries should be simplified
 * @param {boolean} [options.triangulate=false] the geometries should be triangulated
 * @param {...Object} geometries - the geometries to generalize
 * @return {Object|Array} the modified geometry, or a list of modified geometries
 * @alias module:modeling/modifiers.generalize
 */
export const generalize = <T extends Geometry>(
	options: GeneralizeOptions,
	...geometries: RecursiveArray<T>
): T | Array<T> => {
	const results = geometries.map((geometry) => {
		if (path2.isA(geometry)) return generalizePath2(options, geometry as Path2);
		if (geom2.isA(geometry)) return generalizeGeom2(options, geometry as Geom2);
		if (geom3.isA(geometry)) return generalizeGeom3(options, geometry as Geom3);
		if (JsArray.isArray(geometry)) return generalize(options, ...geometry);
		return geometry;
	});
	return results.size() === 1 ? (results[0] as T) : (results as Array<T>);
};
