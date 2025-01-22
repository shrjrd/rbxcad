/**
 * Measure Bounding Box
 * @category Manipulating Shapes
 * @skillLevel 10
 * @description Examples of measureBoundingBox function
 * @tags measurements, bounds, boundingbox
 * @authors Simon Clark
 * @licence MIT License
 */

import rbxcad from "../../modeling/src";
const { cuboid } = rbxcad.primitives;
const { translate, rotate } = rbxcad.transforms;
const { measureBoundingBox } = rbxcad.measurements;
const { colorize } = rbxcad.colors;
const { subtract } = rbxcad.booleans;

const getParameterDefinitions = () => [
	{ name: "rotatex", type: "slider", initial: 0, min: -3.14, max: 3.14, step: 0.01, caption: "X Rotation:" },
	{ name: "rotatey", type: "slider", initial: 0, min: -3.14, max: 3.14, step: 0.01, caption: "Y Rotation:" },
	{ name: "rotatez", type: "slider", initial: 0, min: -3.14, max: 3.14, step: 0.01, caption: "Z Rotation:" },
];

const buildBoundingBox = (bounds: BoundingBox) => {
	// Bounding box format is an array of arrays of values, eg:
	//     [LowerBoundsValues, UpperBoundsValues]
	//     [[left, front, bottom], [right, back, top]]
	//     [[-3, 2, 0], [3, 6, 10]]

	const top = bounds[1][2];
	const bottom = bounds[0][2];
	const left = bounds[0][0];
	const right = bounds[1][0];
	const front = bounds[0][1];
	const back = bounds[1][1];

	const width = right - left;
	const height = top - bottom;
	const depth = back - front;

	let boundingBox = subtract(
		cuboid({ size: [width + 1, depth + 1, height + 1] }),
		cuboid({ size: [width + 1, depth, height] }),
		cuboid({ size: [width, depth + 1, height] }),
		cuboid({ size: [width, depth, height + 1] }),
	);

	boundingBox = translate([(left + right) / 2, (front + back) / 2, (top + bottom) / 2], boundingBox) as Geom3;
	boundingBox = colorize([0.5, 0, 0], boundingBox) as Geom3;
	return boundingBox;
};

const main = (params: { rotatex: number; rotatey: number; rotatez: number }) => {
	let shape = cuboid({ size: [8, 45, 4] });
	shape = rotate([params.rotatex, params.rotatey, params.rotatez], shape) as Geom3;
	const boundingBox = buildBoundingBox(measureBoundingBox(shape) as BoundingBox);
	return [shape, boundingBox];
};

export default main;
