import type { Vec3 } from "../../maths/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as poly3 from "../poly3/index";
import { create } from "./create";

/**
 * Construct a new 3D geometry from a list of vertices.
 * The list of vertices should contain sub-arrays, each defining a single polygon of vertices.
 * In addition, the vertices should follow the right-hand rule for rotation in order to
 * define an external facing polygon.
 * @param {Array} listOfLists - list of lists, where each list is a set of vertices to construct a polygon
 * @returns {Geom3} a new geometry
 * @alias module:modeling/geometries/geom3.fromPoints
 */
export const fromPoints = (listOfLists?: Vec3[][]) => {
	if (!JsArray.isArray(listOfLists)) {
		throw "the given vertices must be an array";
	}

	return create(listOfLists.map(poly3.create));
};
