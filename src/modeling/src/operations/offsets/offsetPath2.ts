import type { Vec2 } from "../../maths/types";
import type { Corners } from "../../utils/corners";
import type { Path2 } from "../../geometries/types";
import { Array as JsArray, Object } from "@rbxts/luau-polyfill";

import * as geom2 from "../../geometries/geom2/index";
import * as path2 from "../../geometries/path2/index";
import { area } from "../../maths/utils/area";
import * as vec2 from "../../maths/vec2/index";
import { circle } from "../../primitives/circle";
import { offsetFromPoints } from "./offsetFromPoints";

const createGeometryFromClosedPath = (paths: { external: Vec2[]; internal: Vec2[] }) => {
	let { external, internal } = paths;
	if (external.size() < 2) return geom2.create();
	if (area(external) < 0) {
		external = JsArray.reverse(external); //external.reverse();
	} else {
		internal = JsArray.reverse(internal); //internal.reverse();
	}
	return geom2.create([external, internal]);
};

const createGeometryFromOpenPath = (
	paths: { points: Vec2[]; external: Vec2[]; internal: Vec2[] },
	segments: number,
	corners: Corners,
	delta: number,
) => {
	const { points, external, internal } = paths;
	if (points.size() === 0) return geom2.create();
	if (points.size() === 1) return circle({ center: points[0], radius: delta });
	const capSegments = math.floor(segments / 2); // rotation is 180 degrees
	const e2iCap: Vec2[] = [];
	const i2eCap: Vec2[] = [];
	if (corners === "round" && capSegments > 0) {
		// added round caps to the geometry
		const step = math.pi / capSegments;
		const eCorner = points[points.size() - 1];
		const e2iStart = vec2.angle(vec2.subtract(vec2.create(), external[external.size() - 1], eCorner));
		const iCorner = points[0];
		const i2eStart = vec2.angle(vec2.subtract(vec2.create(), internal[0], iCorner));
		for (let i = 1; i < capSegments; i++) {
			let radians = e2iStart + step * i;
			let point = vec2.fromAngleRadians(vec2.create(), radians);
			vec2.scale(point, point, delta);
			vec2.add(point, point, eCorner);
			e2iCap.push(point);

			radians = i2eStart + step * i;
			point = vec2.fromAngleRadians(vec2.create(), radians);
			vec2.scale(point, point, delta);
			vec2.add(point, point, iCorner);
			i2eCap.push(point);
		}
	}
	//const allPoints = [];
	//allPoints.push(...external, ...e2iCap, ...internal.reverse(), ...i2eCap);
	//return geom2.create([allPoints]);
	return geom2.create([[...external, ...e2iCap, ...JsArray.reverse(internal), ...i2eCap]]);
};

/**
 * Expand the given geometry (path2) using the given options (if any).
 * @param {object} options - options for offset
 * @param {number} [options.delta=1] - delta (+) of expansion
 * @param {string} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {number} [options.segments=16] - number of segments when creating round corners
 * @param {Path2} geometry - the geometry to offset
 * @returns {Geom2} offset geometry
 */
export const offsetPath2 = (options: { delta?: number; corners?: Corners; segments?: number }, geometry: Path2) => {
	const defaults = {
		delta: 1,
		corners: "edge",
		segments: 16,
	};

	const { delta, corners, segments } = Object.assign({}, defaults, options);

	if (delta <= 0) throw "the given delta must be positive for paths";

	if (!(corners === "edge" || corners === "chamfer" || corners === "round")) {
		throw 'corners must be "edge", "chamfer", or "round"';
	}

	const closed = geometry.isClosed;
	const points = path2.toPoints(geometry);

	const paths = {
		points,
		external: offsetFromPoints({ delta, corners, segments, closed }, points),
		internal: offsetFromPoints({ delta: -delta, corners, segments, closed }, points),
	};

	const output = geometry.isClosed
		? createGeometryFromClosedPath(paths)
		: createGeometryFromOpenPath(paths, segments, corners, delta);
	if (geometry.color) output.color = geometry.color;
	return output;
};
