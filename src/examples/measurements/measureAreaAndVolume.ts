/**
 * Measure Area and Volume
 * @category Manipulating Shapes
 * @skillLevel 10
 * @description Examples of measureArea() and measureVolume() function
 * @tags measurements, area, volume, text
 * @authors Simon Clark
 * @licence MIT License
 */

import rbxcad from "../../modeling/src";
const { circle, sphere, cube, square, star } = rbxcad.primitives;
const { translate, scale } = rbxcad.transforms;
const { measureArea, measureVolume } = rbxcad.measurements;
const { vectorText } = rbxcad.text;
const { path2 } = rbxcad.geometries;

const getParameterDefinitions = () => [
	{
		name: "shape",
		type: "choice",
		caption: "Shape:",
		values: ["circle", "square", "star", "sphere", "cube"],
		initial: "circle",
	},
	{ name: "size", type: "number", initial: 10.0, min: 0.1, max: 10.0, step: 0.01, caption: "Size:" },
	{ name: "segments", type: "choice", values: [8, 16, 32, 64, 128], initial: 16, caption: "Segments:" },
];

const textPaths = (text: string, y: number) => {
	const lineSegmentPointArrays = vectorText({ xOffset: -20, yOffset: -10, input: text });
	let textSegments: Path2[] | Geom3[] = lineSegmentPointArrays.map((points) =>
		path2.fromPoints({ closed: false }, points as Vec2[]),
	);
	textSegments = scale([0.2, 0.2, 0.2], textSegments) as Path2[];
	return translate([-25, y - 10, 0], textSegments);
};

const getShape = (params: { shape: string; size: number; segments: number }) => {
	if (params.shape === "circle") {
		return circle({ radius: params.size, segments: params.segments });
	} else if (params.shape === "square") {
		return square({ size: params.size });
	} else if (params.shape === "star") {
		return star({ vertices: 5, outerRadius: params.size, innerRadius: params.size / 2 });
	} else if (params.shape === "sphere") {
		return sphere({ radius: params.size, segments: params.segments });
	} else if (params.shape === "cube") {
		return cube({ size: params.size });
	}
	error("Shape not provided");
};

/**
 * Measure the area and volume of different geometries at different resolutions.
 * @param {String} params.shape - The shape to create. ( circle | square | star | sphere | cube )
 * @param {Number} params.size - The size of shape to create.
 * @param {Number} params.segments - The resolution of the shape to create. Affects only circle and sphere.
 * @returns {[geometry]} The created shape, and text describing its area and volume.
 */
const main = (params: { shape: string; size: number; segments: number }) => {
	const shape = getShape(params);

	const area = measureArea(shape) as number;
	const areaText = textPaths("area: " + string.format("%.4f", area), -2 - params.size) as Geom3[];

	const volume = measureVolume(shape) as number;
	//const volumeText = textPaths("volume: " + volume.toFixed(4), -8 - params.size);
	const volumeText = textPaths("volume: " + string.format("%.4f", volume), -8 - params.size) as Geom3[];

	return [shape, ...areaText, ...volumeText];
};

export default main;
