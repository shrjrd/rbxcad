import type { Geom2, Slice } from "../../modeling/src/geometries/types";

import { geom2 } from "../../modeling/src/geometries";
import * as slice from "../../modeling/src/geometries/slice";
import { mat4 } from "../../modeling/src/maths";
import { extrudeFromSlices } from "../../modeling/src/operations/extrusions";
import { circle } from "../../modeling/src/primitives";

/**
 * Extrude From Slices
 * @category Creating Shapes
 * @skillLevel 5
 * @description Demonstrating the advanced extrusion using slices with varying numbers of points.
 * @tags extrude, slice, slices, extrudefromslices, callback
 * @authors Jeff Gay, Moissette Mark, Simon Clark
 * @licence MIT License
 */
const main = () => {
	// demonstrates manipulating the original base through translation and scale to build a 3D geometry
	const jigglySquare = (height: number) => {
		let squareWithHole: Geom2 | Slice = geom2.create([
			[
				[-10.0, 10.0],
				[-10.0, -10.0],
			],
			[
				[-10.0, -10.0],
				[10.0, -10.0],
			],
			[
				[10.0, -10.0],
				[10.0, 10.0],
			],
			[
				[10.0, 10.0],
				[-10.0, 10.0],
			],
			[
				[-8.0, -8.0],
				[-8.0, 8.0],
			],
			[
				[8.0, -8.0],
				[-8.0, -8.0],
			],
			[
				[8.0, 8.0],
				[8.0, -8.0],
			],
			[
				[-8.0, 8.0],
				[8.0, 8.0],
			],
		]);
		squareWithHole = slice.fromGeom2(squareWithHole); //slice.fromSides(geom2.toSides(squareWithHole));
		return extrudeFromSlices(
			{
				numberOfSlices: 32,
				callback: (progress, count, base) => {
					const scaleFactor = 1 + 0.03 * math.cos(3 * math.pi * progress);
					const scaleMatrix = mat4.fromScaling(mat4.create(), [scaleFactor, 2 - scaleFactor, 1]);
					const transformMatrix = mat4.fromTranslation(mat4.create(), [0, 0, progress * height]);
					return slice.transform(mat4.multiply(mat4.create(), scaleMatrix, transformMatrix), base);
				},
			},
			squareWithHole,
		);
	};

	// demonstrates using successive different slices to build a 3D geometry
	// "base" is unused in this scenario
	const squareToCircleExtrusion = (height: number) => {
		const base = circle({ radius: 4, segments: 4 });

		return extrudeFromSlices(
			{
				numberOfSlices: 6,
				callback: (progress, count, base) => {
					const newPolygon = circle({ radius: 2 + 5 * progress, segments: 4 + count * count });
					let newSlice = slice.fromGeom2(newPolygon); //slice.fromSides(geom2.toSides(newPolygon));
					newSlice = slice.transform(
						mat4.fromTranslation(mat4.create(), [0, 0, progress * height]),
						newSlice,
					);
					return newSlice;
				},
			},
			base,
		);
	};

	return [jigglySquare(4), squareToCircleExtrusion(10)];
};

export default main;
