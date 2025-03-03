import type { Geom3 } from "../../geometries/types";
import type { Corners } from "../../utils/corners";
import { Object } from "@rbxts/luau-polyfill";

import { union } from "../booleans/union";
import { offsetShell } from "./offsetShell";

/**
 * Expand the given geometry (geom3) using the given options (if any).
 * @param {object} options - options for expand
 * @param {number} [options.delta=1] - delta (+/-) of expansion
 * @param {string} [options.corners='round'] - type corner to create during of expansion; round
 * @param {number} [options.segments=12] - number of segments when creating round corners
 * @param {Geom3} geometry - the geometry to expand
 * @returns {Geom3} expanded geometry
 */
export const offsetGeom3 = (options: { delta?: number; corners?: Corners; segments?: number }, geometry: Geom3) => {
	const defaults = {
		delta: 1,
		corners: "round",
		segments: 12,
	};
	const { delta, corners, segments } = Object.assign({}, defaults, options);

	if (!(corners === "round")) {
		throw 'corners must be "round" for 3D geometries';
	}

	options = { delta, corners, segments };
	const expanded = offsetShell(options, geometry);
	const output = union(geometry, expanded) as Geom3;
	if (geometry.color) output.color = geometry.color;
	return output;
};
