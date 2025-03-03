import type { Slice } from "../../../modeling/src/geometries/types";

import * as bezier from "../../../modeling/src/curves/bezier";
import * as slice from "../../../modeling/src/geometries/slice";
import * as maths from "../../../modeling/src/maths";
import * as extrusions from "../../../modeling/src/operations/extrusions";

/**
 * Simple Bezier Extrude
 * @category Creating Shapes
 * @skillLevel 5
 * @description Using a 1D bezier function to create a non-uniform extrusion
 * @tags curves, bezier, extrusion, slice
 * @authors Simon Clark
 * @licence MIT License
 */
const main = () => [extrudeWobble(30)];

const extrudeWobble = (height: number) => {
	const squareSlice = slice.fromVertices([
		[10, 10],
		[-10, 10],
		[-10, -10],
		[10, -10],
	]);

	const xCurve = bezier.create([1, 2, 0.4, 1]);
	const yCurve = bezier.create([1, 2, 0.5]);

	return extrusions.extrudeFromSlices(
		{
			numberOfSlices: 20,
			capStart: true,
			capEnd: true,
			callback: (progress: number, count: number, base: Slice) => {
				let newslice = slice.transform(
					maths.mat4.fromTranslation(maths.mat4.create(), [0, 0, height * progress]),
					base,
				);
				newslice = slice.transform(
					maths.mat4.fromScaling(maths.mat4.create(), [
						bezier.valueAt(progress, xCurve) as number,
						bezier.valueAt(progress, yCurve) as number,
						1,
					]),
					newslice,
				);
				return newslice;
			},
		},
		squareSlice,
	);
};

export default main;
