import { Array, Object } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import path2 from "../../geometries/path2";
import area from "../../maths/utils/area";
import vec2 from "../../maths/vec2";
import offsetFromPoints from "./offsetFromPoints";

type Paths = {
	points: Vec2[];
	external: Vec2[];
	internal: Vec2[];
};

const createGeometryFromClosedOffsets = (paths: Paths) => {
	let { external, internal } = paths;
	if (area(external) < 0) {
		external = Array.reverse(external); //external.reverse();
	} else {
		internal = Array.reverse(internal); //internal.reverse();
	}
	// NOTE: creating path2 from the points ensures proper closure
	const externalPath = path2.fromPoints({ closed: true }, external);
	const internalPath = path2.fromPoints({ closed: true }, internal);
	const externalSides = geom2.toSides(geom2.fromPoints(path2.toPoints(externalPath)));
	const internalSides = geom2.toSides(geom2.fromPoints(path2.toPoints(internalPath)));
	//externalSides.push(...internalSides);
	for (let i = 0; i < internalSides.size(); i++) {
		externalSides.push(internalSides[i]);
	}
	return geom2.create(externalSides);
};

const createGeometryFromExpandedOpenPath = (paths: Paths, segments: number, corners: string, delta: number) => {
	const { points, external, internal } = paths;
	const capSegments = math.floor(segments / 2); // rotation is 180 degrees
	const e2iCap = [];
	const i2eCap = [];
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
	const allPoints = Array.concat(external, e2iCap, Array.reverse(internal), i2eCap);
	return geom2.fromPoints(allPoints);
};

type ExpandPath2Options = {
	delta?: number;
	corners?: string;
	segments?: number;
};
/**
 * Expand the given geometry (path2) using the given options (if any).
 * @param {Object} options - options for expand
 * @param {Number} [options.delta=1] - delta (+) of expansion
 * @param {String} [options.corners='edge'] - type corner to create during of expansion; edge, chamfer, round
 * @param {Integer} [options.segments=16] - number of segments when creating round corners
 * @param {path2} geometry - the geometry to expand
 * @returns {geom2} expanded geometry
 */
const expandPath2 = (options: ExpandPath2Options, geometry: Path2) => {
	const defaults = {
		delta: 1,
		corners: "edge",
		segments: 16,
	};

	options = Object.assign({}, defaults, options);
	const { delta, corners, segments } = options;

	if (delta! <= 0) throw error("the given delta must be positive for paths");

	if (!(corners === "edge" || corners === "chamfer" || corners === "round")) {
		throw error('corners must be "edge", "chamfer", or "round"');
	}

	const closed = geometry.isClosed;
	const points = path2.toPoints(geometry);
	if (points.size() === 0) throw error("the given geometry cannot be empty");

	const paths = {
		points: points,
		external: offsetFromPoints({ delta, corners, segments, closed }, points),
		internal: offsetFromPoints({ delta: -delta!, corners, segments, closed }, points),
	};

	if (geometry.isClosed) {
		return createGeometryFromClosedOffsets(paths);
	} else {
		return createGeometryFromExpandedOpenPath(paths, segments!, corners, delta!);
	}
};

export default expandPath2;
