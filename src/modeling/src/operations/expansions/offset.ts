import geom2 from "../../geometries/geom2";
import path2 from "../../geometries/path2";
import flatten from "../../utils/flatten";
import offsetGeom2 from "./offsetGeom2";
import offsetPath2 from "./offsetPath2";

type OffsetOptions = {
	delta?: number;
	corners?: "edge" | "chamfer" | "round";
	segments?: number;
};
/**
 * Create offset geometry from the given geometry using the given options.
 * Offsets from internal and external space are created.
 * @param {Object} options - options for offset
 * @param {Float} [options.delta=1] - delta of offset (+ to exterior, - from interior)
 * @param {String} [options.corners='edge'] - type of corner to create after offseting; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {...Object} objects - the geometries to offset
 * @return {Object|Array} new geometry, or list of new geometries
 * @alias module:modeling/expansions.offset
 *
 * @example
 * let small = offset({ delta: -4, corners: 'chamfer' }, square({size: 40})) // contract
 */
const offset = (options: OffsetOptions, ...objects: (Path2 | Geom2)[]): (Path2 | Geom2) | (Path2 | Geom2)[] => {
	objects = flatten(objects);
	if (objects.size() === 0) throw error("wrong number of arguments");

	const results = objects.map((object) => {
		if (path2.isA(object)) return offsetPath2(options, object as Path2);
		if (geom2.isA(object)) return offsetGeom2(options, object as Geom2);
		// if (geom3.isA(object)) return geom3.transform(matrix, object)
		return object;
	});
	return results.size() === 1 ? results[0] : results;
};

export default offset;
