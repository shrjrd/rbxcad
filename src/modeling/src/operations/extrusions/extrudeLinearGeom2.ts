import type { Geom2, Slice } from "../../geometries/types";
import type { Vec3 } from "../../maths/types";
import { Object } from "@rbxts/luau-polyfill";

import * as slice from "../../geometries/slice/index";
import * as mat4 from "../../maths/mat4/index";
import * as vec3 from "../../maths/vec3/index";
import { extrudeFromSlices } from "./extrudeFromSlices";

/**
 * Extrude the given geometry using the given options.
 *
 * @param {object} [options] - options for extrude
 * @param {Array} [options.offset] - the direction of the extrusion as a 3D vector
 * @param {number} [options.twistAngle] - the final rotation (RADIANS) about the origin
 * @param {number} [options.twistSteps] - the number of steps created to produce the twist (if any)
 * @param {boolean} [options.repair] - repair gaps in the geometry
 * @param {Geom2} geometry - the geometry to extrude
 * @returns {Geom3} the extruded 3D geometry
 */
export const extrudeLinearGeom2 = (
	options: {
		offset?: Vec3;
		twistAngle?: number;
		twistSteps?: number;
		repair?: boolean;
	},
	geometry: Geom2,
) => {
	const defaults = {
		offset: [0, 0, 1],
		twistAngle: 0,
		twistSteps: 12,
		repair: true,
	};
	// eslint-disable-next-line prefer-const
	let { offset, twistAngle, twistSteps, repair } = Object.assign({}, defaults, options);

	if (twistSteps < 1) throw "twistSteps must be 1 or more";

	if (twistAngle === 0) {
		twistSteps = 1;
	}

	// convert to vector in order to perform transforms
	const offsetV = vec3.clone(offset);

	let baseSlice = slice.fromGeom2(geometry);
	if (offsetV[2] < 0) baseSlice = slice.reverse(baseSlice);

	const matrix = mat4.create();
	const createTwist = (progress: number, index: number, base: Slice) => {
		const Zrotation = (index / twistSteps) * twistAngle;
		const Zoffset = vec3.scale(vec3.create(), offsetV, index / twistSteps);
		mat4.multiply(matrix, mat4.fromZRotation(matrix, Zrotation), mat4.fromTranslation(mat4.create(), Zoffset));

		return slice.transform(matrix, base);
	};

	const output = extrudeFromSlices(
		{
			numberOfSlices: twistSteps + 1,
			capStart: true,
			capEnd: true,
			repair,
			callback: createTwist,
		},
		baseSlice,
	);
	if (geometry.color) output.color = geometry.color;
	return output;
};
