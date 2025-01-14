import { Array as JsArray, Object } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import path2 from "../../geometries/path2";
import { area } from "../../maths/utils";
import expand from "../expansions/expand";
import extrudeLinearGeom2 from "./extrudeLinearGeom2";

/**
 * Expand and extrude the given geometry (geom2).
 * @see expand for additional options
 * @param {Object} options - options for extrusion, if any
 * @param {Number} [options.size=1] - size of the rectangle
 * @param {Number} [options.height=1] - height of the extrusion
 * @param {geom2} geometry - the geometry to extrude
 * @return {geom3} the extruded geometry
 */
const extrudeRectangularGeom2 = (options: { size?: number; height?: number }, geometry: Geom2): Geom3 => {
	const defaults = {
		size: 1,
		height: 1,
	};
	const { size, height } = Object.assign({}, defaults, options);

	(options as { delta: number; offset: Vec3; height: number; size: number }).delta = size;
	(options as { delta: number; offset: Vec3; height: number; size: number }).offset = [0, 0, height];

	// convert the geometry to outlines
	const outlines = geom2.toOutlines(geometry);
	if (outlines.size() === 0) error("the given geometry cannot be empty");

	// expand the outlines
	const newparts = outlines.map((outline) => {
		if (area(outline) < 0) JsArray.reverse(outline); //outline.reverse(); // all outlines must wind counter clockwise
		return expand(
			options as unknown as { delta: number; offset: Vec3 },
			path2.fromPoints({ closed: true }, outline),
		);
	});

	// create a composite geometry
	//const allsides = newparts.reduce((sides, part) => sides.concat(geom2.toSides(part)), []);
	const allsides = newparts.reduce(
		(sides: [Vec2, Vec2][], part) => JsArray.concat(sides, geom2.toSides(part as Geom2)),
		[],
	);
	const newgeometry = geom2.create(allsides);

	return extrudeLinearGeom2(
		options as { offset?: Vec3; twistAngle?: number; twistSteps?: number; repair?: boolean },
		newgeometry,
	);
};

export default extrudeRectangularGeom2;
