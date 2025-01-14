import geom2 from "../../geometries/geom2";
import geom3 from "../../geometries/geom3";
import path2 from "../../geometries/path2";
import flatten from "../../utils/flatten";
import expandGeom2 from "./expandGeom2";
import expandGeom3 from "./expandGeom3";
import expandPath2 from "./expandPath2";

type ExpandOptions = {
	delta?: number;
	segments?: number;
	corners?: string;
};
/**
 * Expand the given geometry using the given options.
 * Both internal and external space is expanded for 2D and 3D shapes.
 *
 * Note: Contract is expand using a negative delta.
 * @param {Object} options - options for expand
 * @param {Number} [options.delta=1] - delta (+/-) of expansion
 * @param {String} [options.corners='edge'] - type of corner to create after expanding; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {...Objects} objects - the geometries to expand
 * @return {Object|Array} new geometry, or list of new geometries
 * @alias module:modeling/expansions.expand
 *
 * @example
 * let newarc = expand({delta: 5, corners: 'edge'}, arc({}))
 * let newsquare = expand({delta: 5, corners: 'chamfer'}, square({size: 30}))
 * let newcuboid = expand({delta: 2, corners: 'round'}, cuboid({size: [20, 25, 5]}))
 */
const expand = (options: ExpandOptions, ...objects: object[]) => {
	objects = flatten(objects);
	if (objects.size() === 0) throw error("wrong number of arguments");

	const results = objects.map((object) => {
		if (path2.isA(object)) return expandPath2(options, object as Path2);
		if (geom2.isA(object)) return expandGeom2(options, object as Geom2);
		if (geom3.isA(object)) return expandGeom3(options, object as Geom3);
		return object;
	});
	return results.size() === 1 ? results[0] : results;
};

export default expand;
