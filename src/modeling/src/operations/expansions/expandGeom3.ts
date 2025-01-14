import { Object } from "@rbxts/luau-polyfill";

import geom3 from "../../geometries/geom3";
import union from "../booleans/union";
import expandShell from "./expandShell";

type ExpandGeom3Options = {
	delta?: number;
	corners?: string;
	segments?: number;
};
/**
 * Expand the given geometry (geom3) using the given options (if any).
 * @param {Object} options - options for expand
 * @param {Number} [options.delta=1] - delta (+/-) of expansion
 * @param {String} [options.corners='round'] - type corner to create during of expansion; round
 * @param {Integer} [options.segments=12] - number of segments when creating round corners
 * @param {geom3} geometry - the geometry to expand
 * @returns {geom3} expanded geometry
 */
const expandGeom3 = (options: ExpandGeom3Options, geometry: Geom3) => {
	const defaults = {
		delta: 1,
		corners: "round",
		segments: 12,
	};
	const { delta, corners, segments } = Object.assign({}, defaults, options);

	if (!(corners === "round")) {
		throw error('corners must be "round" for 3D geometries');
	}

	const polygons = geom3.toPolygons(geometry);
	if (polygons.size() === 0) throw error("the given geometry cannot be empty");

	options = { delta, corners, segments };
	const expanded = expandShell(options, geometry);
	return union(geometry, expanded) as Geom3;
};

export default expandGeom3;
