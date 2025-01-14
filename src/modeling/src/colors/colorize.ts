import { Array, Error } from "@rbxts/luau-polyfill";

import geom2 from "../geometries/geom2";
import geom3 from "../geometries/geom3";
import path2 from "../geometries/path2";
import poly3 from "../geometries/poly3";
import flatten from "../utils/flatten";

const colorGeom2 = (color: RGB | RGBA, object: Geom2) => {
	const newgeom2 = geom2.clone(object);
	newgeom2.color = color;
	return newgeom2;
};

const colorGeom3 = (color: RGB | RGBA, object: Geom3) => {
	const newgeom3 = geom3.clone(object);
	newgeom3.color = color;
	return newgeom3;
};

const colorPath2 = (color: RGB | RGBA, object: Path2) => {
	const newpath2 = path2.clone(object);
	newpath2.color = color;
	return newpath2;
};

const colorPoly3 = (color: RGB | RGBA, object: Poly3) => {
	const newpoly = poly3.clone(object);
	newpoly.color = color;
	return newpoly;
};

/**
 * Assign the given color to the given objects.
 * @param {Array} color - RGBA color values, where each value is between 0 and 1.0
 * @param {Object|Array} objects - the objects of which to apply the given color
 * @return {Object|Array} new object, or list of new objects with an additional attribute 'color'
 * @alias module:modeling/colors.colorize
 *
 * @example
 * let redSphere = colorize([1,0,0], sphere()) // red
 * let greenCircle = colorize([0,1,0,0.8], circle()) // green transparent
 * let blueArc = colorize([0,0,1], arc()) // blue
 * let wildcylinder = colorize(colorNameToRgb('fuchsia'), cylinder()) // CSS color
 */
const colorize = (color: RGB | RGBA, ...objects: object[] | [object[]]): object | object[] => {
	if (!Array.isArray(color)) throw new Error("color must be an array");
	if (color.size() < 3) throw new Error("color must contain R, G and B values");
	if (color.size() === 3) color = [color[0], color[1], color[2], 1.0]; // add alpha
	objects = flatten(objects);
	if (objects.size() === 0) throw new Error("wrong number of arguments");

	const results = objects.map((object) => {
		if (geom2.isA(object)) return colorGeom2(color, object as Geom2);
		if (geom3.isA(object)) return colorGeom3(color, object as Geom3);
		if (path2.isA(object)) return colorPath2(color, object as Path2);
		if (poly3.isA(object)) return colorPoly3(color, object as Poly3);

		(object as Geometry).color = color;
		return object;
	});
	return results.size() === 1 ? results[0] : results;
};

export default colorize;
