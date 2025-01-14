import { Object } from "@rbxts/luau-polyfill";

import path2 from "../../geometries/path2";
import expand from "../expansions/expand";
import extrudeLinearGeom2 from "./extrudeLinearGeom2";

/**
 * Expand and extrude the given geometry (path2).
 * @See expand for addition options
 * @param {Object} options - options for extrusion, if any
 * @param {Number} [options.size=1] - size of the rectangle
 * @param {Number} [options.height=1] - height of the extrusion
 * @param {path2} geometry - the geometry to extrude
 * @return {geom3} the extruded geometry
 */
const extrudeRectangularPath2 = (options: { size?: number; height?: number }, geometry: Path2): Geom3 => {
	const defaults = {
		size: 1,
		height: 1,
	};
	const { size, height } = Object.assign({}, defaults, options);

	(options as { size: number; height: number; delta: number }).delta = size;
	(options as { size: number; height: number; offset: Vec3 }).offset = [0, 0, height];

	const points = path2.toPoints(geometry);
	if (points.size() === 0) error("the given geometry cannot be empty");

	const newgeometry = expand(options as unknown as { delta: number; offset: Vec3 }, geometry) as Geom2;
	return extrudeLinearGeom2(
		options as { offset?: Vec3; twistAngle?: number; twistSteps?: number; repair?: boolean },
		newgeometry,
	);
};

export default extrudeRectangularPath2;
