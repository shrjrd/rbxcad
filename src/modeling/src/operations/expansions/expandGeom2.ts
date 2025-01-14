import { Array, Object } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import offsetFromPoints from "./offsetFromPoints";

type ExpandGeom2Options = {
	delta?: number;
	corners?: string;
	segments?: number;
};
/**
 * Expand the given geometry (geom2) using the given options (if any).
 * @param {Object} options - options for expand
 * @param {Number} [options.delta=1] - delta (+/-) of expansion
 * @param {String} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {geom2} geometry - the geometry to expand
 * @returns {geom2} expanded geometry
 */
const expandGeom2 = (options: ExpandGeom2Options, geometry: Geom2) => {
	const defaults = {
		delta: 1,
		corners: "edge",
		segments: 16,
	};
	const { delta, corners, segments } = Object.assign({}, defaults, options);

	if (!(corners === "edge" || corners === "chamfer" || corners === "round")) {
		throw error('corners must be "edge", "chamfer", or "round"');
	}

	// convert the geometry to outlines, and generate offsets from each
	const outlines = geom2.toOutlines(geometry);
	const newoutlines = outlines.map((outline) => {
		return offsetFromPoints(
			{
				delta,
				corners,
				closed: true,
				segments,
			},
			outline,
		);
	});

	// create a composite geometry from the new outlines
	const allsides = newoutlines.reduce(
		//(sides: [Vec2, Vec2][], newoutline) => sides.concat(geom2.toSides(geom2.fromPoints(newoutline))),
		(sides: [Vec2, Vec2][], newoutline) => Array.concat(sides, geom2.toSides(geom2.fromPoints(newoutline))),
		[],
	);
	return geom2.create(allsides);
};

export default expandGeom2;
