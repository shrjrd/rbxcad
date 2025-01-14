import { Object } from "@rbxts/luau-polyfill";

import geom2 from "../../geometries/geom2";
import mat4 from "../../maths/mat4";
import vec3 from "../../maths/vec3";
import extrudeFromSlices from "./extrudeFromSlices";
import slice from "./slice";

/**
 * Extrude the given geometry using the given options.
 *
 * @param {Object} [options] - options for extrude
 * @param {Array} [options.offset] - the direction of the extrusion as a 3D vector
 * @param {Number} [options.twistAngle] - the final rotation (RADIANS) about the origin
 * @param {Integer} [options.twistSteps] - the number of steps created to produce the twist (if any)
 * @param {Boolean} [options.repair] - repair gaps in the geometry
 * @param {geom2} geometry - the geometry to extrude
 * @returns {geom3} the extruded 3D geometry
 */
const extrudeGeom2 = (
	options: { offset?: Vec3; twistAngle?: number; twistSteps?: number; repair?: boolean },
	geometry: Geom2,
): Geom3 => {
	const defaults = {
		offset: [0, 0, 1],
		twistAngle: 0,
		twistSteps: 12,
		repair: true,
	};
	// eslint-disable-next-line prefer-const
	let { offset, twistAngle, twistSteps, repair } = Object.assign({}, defaults, options);

	if (twistSteps < 1) error("twistSteps must be 1 or more");

	if (twistAngle === 0) {
		twistSteps = 1;
	}

	// convert to vector in order to perform transforms
	const offsetv = vec3.clone(offset);

	const baseSides = geom2.toSides(geometry);
	if (baseSides.size() === 0) error("the given geometry cannot be empty");

	const baseSlice = slice.fromSides(baseSides);
	if (offsetv[2] < 0) slice.reverse(baseSlice, baseSlice);

	const matrix = mat4.create();
	const createTwist = (progress: number, index: number, base: Slice) => {
		const Zrotation = (index / twistSteps) * twistAngle;
		const Zoffset = vec3.scale(vec3.create(), offsetv, index / twistSteps);
		mat4.multiply(matrix, mat4.fromZRotation(matrix, Zrotation), mat4.fromTranslation(mat4.create(), Zoffset));

		return slice.transform(matrix, base);
	};

	return extrudeFromSlices(
		{
			numberOfSlices: twistSteps + 1,
			capStart: true,
			capEnd: true,
			repair,
			callback: createTwist,
		},
		baseSlice,
	);
};

export default extrudeGeom2;
