import type { Geom2, Slice } from "../../geometries/types";

export interface ExtrudeRotateOptions {
	angle?: number;
	startAngle?: number;
	overflow?: "cap";
	segments?: number;
}

import { Object } from "@rbxts/luau-polyfill";

import * as geom2 from "../../geometries/geom2/index";
import * as geom3 from "../../geometries/geom3/index";
import * as slice from "../../geometries/slice/index";
import { TAU } from "../../maths/constants";
import * as mat4 from "../../maths/mat4/index";
import { mirrorX } from "../transforms/mirror";
import { extrudeFromSlices } from "./extrudeFromSlices";

/**
 * Rotate extrude the given geometry using the given options.
 *
 * @param {object} options - options for extrusion
 * @param {number} [options.angle=TAU] - angle of the extrusion (RADIANS)
 * @param {number} [options.startAngle=0] - start angle of the extrusion (RADIANS)
 * @param {string} [options.overflow='cap'] - what to do with points outside of bounds (+ / - x) :
 * defaults to capping those points to 0 (only supported behaviour for now)
 * @param {number} [options.segments=12] - number of segments of the extrusion
 * @param {Geom2} geometry - the geometry to extrude
 * @returns {Geom3} the extruded geometry
 * @alias module:modeling/extrusions.extrudeRotate
 *
 * @example
 * const myshape = extrudeRotate({segments: 8, angle: TAU / 2}, circle({size: 3, center: [4, 0]}))
 */
export const extrudeRotate = (options: ExtrudeRotateOptions, geometry: Geom2) => {
	const defaults = {
		segments: 12,
		startAngle: 0,
		angle: TAU,
		overflow: "cap",
	};
	// eslint-disable-next-line prefer-const
	let { segments, startAngle, angle, overflow } = Object.assign({}, defaults, options);

	if (segments < 3) throw "segments must be greater then 3";

	startAngle = math.abs(startAngle) > TAU ? startAngle % TAU : startAngle;
	angle = math.abs(angle) > TAU ? angle % TAU : angle;

	let endAngle = startAngle + angle;
	endAngle = math.abs(endAngle) > TAU ? endAngle % TAU : endAngle;

	if (endAngle < startAngle) {
		const x = startAngle;
		startAngle = endAngle;
		endAngle = x;
	}
	let totalRotation = endAngle - startAngle;
	if (totalRotation <= 0.0) totalRotation = TAU;

	if (math.abs(totalRotation) < TAU) {
		// adjust the segments to achieve the total rotation requested
		const anglePerSegment = TAU / segments;
		segments = math.floor(math.abs(totalRotation) / anglePerSegment);
		if (math.abs(totalRotation) > segments * anglePerSegment) segments++;
	}

	// convert geometry to an array of sides, easier to deal with
	let shapeSides = geom2.toSides(geometry);
	if (shapeSides.size() === 0) return geom3.create();
	let sliceGeometry = geometry;

	// determine if the extrusion can be computed in the first place
	// ie all the points have to be either x > 0 or x < 0

	// generic solution to always have a valid solid, even if points go beyond x/ -x
	// 1. split points up between all those on the 'left' side of the axis (x<0) & those on the 'right' (x>0)
	// 2. for each set of points do the extrusion operation IN OPPOSITE DIRECTIONS
	// 3. union the two resulting solids

	// 1. alt : OR : just cap of points at the axis ?

	const pointsWithNegativeX = shapeSides.filter((s) => s[0][0] < 0);
	const pointsWithPositiveX = shapeSides.filter((s) => s[0][0] >= 0);
	const arePointsWithNegAndPosX = pointsWithNegativeX.size() > 0 && pointsWithPositiveX.size() > 0;

	// FIXME actually there are cases where setting X=0 will change the basic shape
	// - Alternative #1 : don't allow shapes with both negative and positive X values
	// - Alternative #2 : remove one half of the shape (costly)
	if (arePointsWithNegAndPosX && overflow === "cap") {
		if (pointsWithNegativeX.size() > pointsWithPositiveX.size()) {
			shapeSides = shapeSides.map((side) => {
				let point0 = side[0];
				let point1 = side[1];
				point0 = [math.min(point0[0], 0), point0[1]];
				point1 = [math.min(point1[0], 0), point1[1]];
				return [point0, point1];
			});
			// recreate the geometry from the (-) capped points
			sliceGeometry = geom2.fromSides(shapeSides);
			sliceGeometry = mirrorX(sliceGeometry) as Geom2;
		} else if (pointsWithPositiveX.size() >= pointsWithNegativeX.size()) {
			shapeSides = shapeSides.map((side) => {
				let point0 = side[0];
				let point1 = side[1];
				point0 = [math.max(point0[0], 0), point0[1]];
				point1 = [math.max(point1[0], 0), point1[1]];
				return [point0, point1];
			});
			// recreate the geometry from the (+) capped points
			sliceGeometry = geom2.fromSides(shapeSides);
		}
	}

	const rotationPerSlice = totalRotation / segments;
	const isCapped = math.abs(totalRotation) < TAU;
	let baseSlice = slice.fromGeom2(sliceGeometry);
	baseSlice = slice.reverse(baseSlice);

	const matrix = mat4.create();
	const createSlice = (progress: number, index: number, base: Slice) => {
		let Zrotation = rotationPerSlice * index + startAngle;
		// fix rounding error when rotating TAU radians
		if (totalRotation === TAU && index === segments) {
			Zrotation = startAngle;
		}
		mat4.multiply(matrix, mat4.fromZRotation(matrix, Zrotation), mat4.fromXRotation(mat4.create(), TAU / 4));

		return slice.transform(matrix, base);
	};

	const output = extrudeFromSlices(
		{
			numberOfSlices: segments + 1,
			capStart: isCapped,
			capEnd: isCapped,
			close: !isCapped,
			callback: createSlice,
		},
		baseSlice,
	);
	if (geometry.color) output.color = geometry.color;
	return output;
};
