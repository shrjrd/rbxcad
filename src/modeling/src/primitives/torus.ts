import type { Geom2 } from "../geometries/types";

export interface TorusOptions {
	innerRadius?: number;
	outerRadius?: number;
	innerSegments?: number;
	outerSegments?: number;
	innerRotation?: number;
	outerRotation?: number;
	startAngle?: number;
}

import { Object } from "@rbxts/luau-polyfill";

import { TAU } from "../maths/constants";
import { extrudeRotate } from "../operations/extrusions/extrudeRotate";
import { rotate } from "../operations/transforms/rotate";
import { translate } from "../operations/transforms/translate";
import { circle } from "./circle";
import { isGT, isGTE } from "./commonChecks";

/**
 * Construct a torus by revolving a small circle (inner) about the circumference of a large (outer) circle.
 * @param {object} [options] - options for construction
 * @param {number} [options.innerRadius=1] - radius of small (inner) circle
 * @param {number} [options.outerRadius=4] - radius of large (outer) circle
 * @param {number} [options.innerSegments=32] - number of segments to create per rotation
 * @param {number} [options.outerSegments=32] - number of segments to create per rotation
 * @param {number} [options.innerRotation=0] - rotation of small (inner) circle in radians
 * @param {number} [options.outerRotation=TAU] - rotation (outer) of the torus (RADIANS)
 * @param {number} [options.startAngle=0] - start angle of the torus (RADIANS)
 * @returns {Geom3} new 3D geometry
 * @alias module:modeling/primitives.torus
 *
 * @example
 * let myshape = torus({ innerRadius: 10, outerRadius: 100 })
 */
export const torus = (options?: TorusOptions) => {
	const defaults = {
		innerRadius: 1,
		innerSegments: 32,
		outerRadius: 4,
		outerSegments: 32,
		innerRotation: 0,
		startAngle: 0,
		outerRotation: TAU,
	};
	const { innerRadius, innerSegments, outerRadius, outerSegments, innerRotation, startAngle, outerRotation } =
		Object.assign({}, defaults, options);

	if (!isGT(innerRadius, 0)) throw "innerRadius must be greater than zero";
	if (!isGTE(innerSegments, 3)) throw "innerSegments must be three or more";
	if (!isGT(outerRadius, 0)) throw "outerRadius must be greater than zero";
	if (!isGTE(outerSegments, 3)) throw "outerSegments must be three or more";
	if (!isGTE(startAngle, 0)) throw "startAngle must be positive";
	if (!isGT(outerRotation, 0)) throw "outerRotation must be greater than zero";

	if (innerRadius >= outerRadius) throw "inner circle is too large to rotate about the outer circle";

	let innerCircle = circle({ radius: innerRadius, segments: innerSegments });

	if (innerRotation !== 0) {
		innerCircle = rotate([0, 0, innerRotation], innerCircle) as Geom2;
	}

	innerCircle = translate([outerRadius, 0], innerCircle) as Geom2;

	const extrudeOptions = {
		startAngle: startAngle,
		angle: outerRotation,
		segments: outerSegments,
	};
	return extrudeRotate(extrudeOptions, innerCircle);
};
