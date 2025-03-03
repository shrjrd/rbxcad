import type { RecursiveArray } from "../utils/recursiveArray";
import type { Geometry, Colored, Geom2, Geom3, Path2, Poly3 } from "../geometries/types";
import type { RGB, RGBA } from "./types";

import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as geom2 from "../geometries/geom2/index";
import * as geom3 from "../geometries/geom3/index";
import * as path2 from "../geometries/path2/index";
import * as poly3 from "../geometries/poly3/index";

const colorGeom2 = (color: RGB | RGBA, object: Geom2) => {
	const newGeom2 = geom2.clone(object);
	newGeom2.color = color;
	return newGeom2;
};

const colorGeom3 = (color: RGB | RGBA, object: Geom3) => {
	const newGeom3 = geom3.clone(object);
	newGeom3.color = color;
	return newGeom3;
};

const colorPath2 = (color: RGB | RGBA, object: Path2) => {
	const newPath2 = path2.clone(object);
	newPath2.color = color;
	return newPath2;
};

const colorPoly3 = (color: RGB | RGBA, object: Poly3) => {
	const newPoly = poly3.clone(object);
	newPoly.color = color;
	return newPoly;
};

/**
 * Assign the given color to the given objects.
 * @param {Array} color - RGBA color values, where each value is between 0 and 1.0
 * @param {object|Array} objects - the objects of which to apply the given color
 * @return {Object|Array} new object, or list of new objects with an additional attribute 'color'
 * @alias module:modeling/colors.colorize
 *
 * @example
 * let redSphere = colorize([1,0,0], sphere()) // red
 * let greenCircle = colorize([0,1,0,0.8], circle()) // green transparent
 * let blueArc = colorize([0,0,1], arc()) // blue
 * let wildCylinder = colorize(colorNameToRgb('fuchsia'), cylinder()) // CSS color
 */
export const colorize = <T extends Geometry>(
	color: RGB | RGBA,
	...objects: RecursiveArray<T>
): Array<T & Colored> | (T & Colored) => {
	if (!JsArray.isArray(color)) throw "color must be an array";
	if (color.size() < 3) throw "color must contain R, G and B values";
	if (color.size() === 3) color = [color[0], color[1], color[2], 1.0]; // add alpha
	const results = objects.map((object) => {
		if (geom2.isA(object)) return colorGeom2(color, object as Geom2);
		if (geom3.isA(object)) return colorGeom3(color, object as Geom3);
		if (path2.isA(object)) return colorPath2(color, object as Path2);
		if (poly3.isA(object)) return colorPoly3(color, object as Poly3);
		if (JsArray.isArray(object)) return colorize(color, ...object);

		object.color = color;
		return object;
	});
	// DEVIATION: undefined in roblox-ts is nil, which is not iterated over in roblox-ts's array.map
	if (results.size() === 0) return { color: color } as T & Colored;
	return results.size() === 1 ? (results[0] as T & Colored) : (results as Array<T & Colored>);
};
