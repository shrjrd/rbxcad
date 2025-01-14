/**
 * Represents a 3D geometry consisting of a list of edges.
 * @see {@link slice} for data structure information.
 * @module modeling/extrusions/slice
 */
import calculatePlane from "./calculatePlane";
import clone from "./clone";
import create from "./create";
import equals from "./equals";
import fromPoints from "./fromPoints";
import fromSides from "./fromSides";
import isA from "./isA";
import reverse from "./reverse";
import toEdges from "./toEdges";
import toPolygons from "./toPolygons";
import toString from "./toString";
import transform from "./transform";

export default {
	calculatePlane,
	clone,
	create,
	equals,
	fromPoints,
	fromSides,
	isA,
	reverse,
	toEdges,
	toPolygons,
	toString,
	transform,
};

export {
	calculatePlane,
	clone,
	create,
	equals,
	fromPoints,
	fromSides,
	isA,
	reverse,
	toEdges,
	toPolygons,
	toString,
	transform,
};
