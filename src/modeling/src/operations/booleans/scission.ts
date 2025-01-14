// const geom2 = require('../../geometries/geom2')
import geom3 from "../../geometries/geom3";
import flatten from "../../utils/flatten";
// const scissionGeom2 = require('./scissionGeom2')
import scissionGeom3 from "./scissionGeom3";

/**
 * Scission (divide) the given geometry into the component pieces.
 *
 * @param {...Object} objects - list of geometries
 * @returns {Array} list of pieces from each geometry
 * @alias module:modeling/booleans.scission
 *
 * @example
 * let figure = require('./my.stl')
 * let pieces = scission(figure)
 *
 * @example
 * +-------+            +-------+
 * |       |            |       |
 * |   +---+            | A +---+
 * |   |    +---+   =   |   |    +---+
 * +---+    |   |       +---+    |   |
 *      +---+   |            +---+   |
 *      |       |            |    B  |
 *      +-------+            +-------+
 */
const scission = (...objects: Geom3[]) => {
	objects = flatten(objects);
	if (objects.size() === 0) error("wrong number of arguments");

	const results = objects.map((object) => {
		// if (path2.isA(object)) return path2.transform(matrix, object)
		// if (geom2.isA(object)) return geom2.transform(matrix, object)
		if (geom3.isA(object)) return scissionGeom3(object);
		return object;
	});
	return results.size() === 1 ? results[0] : results;
};

export default scission;
