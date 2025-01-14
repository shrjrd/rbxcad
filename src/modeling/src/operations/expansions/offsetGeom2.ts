import { Array, Object } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import poly2 from "../../geometries/poly2";
import offsetFromPoints from "./offsetFromPoints";

type OffsetOptions = {
	delta?: number;
	corners?: "edge" | "chamfer" | "round";
	segments?: number;
};
/**
 * Create a offset geometry from the given geom2 using the given options (if any).
 * @param {Object} options - options for offset
 * @param {Float} [options.delta=1] - delta of offset (+ to exterior, - from interior)
 * @param {String} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {geom2} geometry - geometry from which to create the offset
 * @returns {geom2} offset geometry, plus rounded corners
 */
const offsetGeom2 = (options: OffsetOptions, geometry: Geom2) => {
	const defaults = {
		delta: 1,
		corners: "edge",
		segments: 0,
	};
	const { delta, corners, segments } = Object.assign({}, defaults, options);

	if (!(corners === "edge" || corners === "chamfer" || corners === "round")) {
		throw error('corners must be "edge", "chamfer", or "round"');
	}

	// convert the geometry to outlines, and generate offsets from each
	const outlines = geom2.toOutlines(geometry);
	const newoutlines = outlines.map((outline) => {
		const level = outlines.reduce((acc, polygon) => acc + poly2.arePointsInside(outline, poly2.create(polygon)), 0);
		const outside = level % 2 === 0;
		return offsetFromPoints(
			{
				delta: outside ? delta : -delta,
				corners,
				closed: true,
				segments,
			},
			outline,
		);
	});

	// create a composite geometry from the new outlines
	const allsides = newoutlines.reduce(
		(sides: [Vec2, Vec2][], newoutline) => Array.concat(sides, geom2.toSides(geom2.fromPoints(newoutline))), //sides.concat(geom2.toSides(geom2.fromPoints(newoutline))),
		[],
	);
	return geom2.create(allsides);
};

export default offsetGeom2;
