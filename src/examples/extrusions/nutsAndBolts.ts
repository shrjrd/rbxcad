/**
 * Nuts and Bolts
 * @category Creating Shapes
 * @skillLevel 8
 * @description Demonstrating the advanced extrusion using slices to generate screw threads.
 * @tags extrude, slice, slices, extrudefromslices, callback
 * @authors platypii
 * @licence MIT License
 */

import rbxcad from "../../modeling/src";
const { cylinder } = rbxcad.primitives;
const { subtract, union } = rbxcad.booleans;
const { colorize } = rbxcad.colors;
const { extrudeFromSlices, slice } = rbxcad.extrusions;
const { translate } = rbxcad.transforms;

const options = {
	hexWidth: 10,
	hexHeight: 8,
	threadLength: 32,
	threadSize: 4,
	innerRadius: 4,
	outerRadius: 5.6,
	slicesPerRevolution: 12,
	segments: 32,
};

const main = () => {
	return [colorize([0.9, 0.6, 0.2], bolt(options)), colorize([0.4, 0.4, 0.4], translate([30, 0, 0], nut(options)))];
};

// generate bolt by attaching threads to a hex head
const bolt = (options: {
	hexWidth: number;
	hexHeight: number;
	threadLength: number;
	threadSize: number;
	innerRadius: number;
	outerRadius: number;
	slicesPerRevolution: number;
	segments: number;
}) => {
	return union(translate([0, 0, options.threadLength], hex(options)) as Geom3, threads(options));
};

// generate nut by subtracting threads from a hex block
const nut = (options: {
	hexWidth: number;
	hexHeight: number;
	threadLength: number;
	threadSize: number;
	innerRadius: number;
	outerRadius: number;
	slicesPerRevolution: number;
	segments: number;
}) => {
	return subtract(hex(options), threads({ ...options, threadLength: options.hexHeight }));
};

// generate hexagonal block
const hex = (options: { hexWidth: number; hexHeight: number }) => {
	const radius = options.hexWidth * 1.1547005; // hexagon outer radius
	const height = options.hexHeight;
	return cylinder({ center: [0, 0, height / 2], height, radius, segments: 6 });
};

// generate a threaded shaft using extrudeFromSlices
const threads = (options: {
	innerRadius: number;
	outerRadius: number;
	segments: number;
	threadLength: number;
	slicesPerRevolution: number;
	threadSize: number;
}) => {
	const { innerRadius, outerRadius, segments, threadLength } = options;
	const revolutions = threadLength / options.threadSize;
	const numberOfSlices = options.slicesPerRevolution * revolutions;
	return extrudeFromSlices(
		{
			numberOfSlices,
			callback: (progress, index, base) => {
				// generate each slice manually
				const points: Vec3[] = [];
				for (let i = 0; i < segments; i++) {
					const pointAngle = (math.pi * 2 * i) / segments;
					const threadAngle = (2 * math.pi * revolutions * progress) % (math.pi * 2);

					// define the shape of the threads
					const phase = angleDiff(threadAngle, pointAngle) / math.pi;
					const radius = lerp(innerRadius, outerRadius, 1.4 * phase - 0.2);

					const x = radius * math.cos(pointAngle);
					const y = radius * math.sin(pointAngle);
					points.push([x, y, threadLength * progress]);
				}
				return slice.fromPoints(points);
			},
		},
		{},
	);
};

// linear interpolation with bounding
const lerp = (a: number, b: number, t: number) => math.max(a, math.min(b, a + (b - a) * t));

const angleDiff = (angle1: number, angle2: number) => {
	const diff = math.abs((angle1 - angle2) % (math.pi * 2));
	return diff > math.pi ? math.pi * 2 - diff : diff;
};

export default main;
