/**
 * Hull and HullChain 3D example
 * @category Creating Shapes
 * @skillLevel 8
 * @description Demonstrating the basics of Hulls in three dimensions
 * @tags hull, hullchain
 * @authors Simon Clark
 * @licence MIT License
 */

import rbxcad from "../../modeling/src";
const { cuboid, sphere } = rbxcad.primitives;
const { translate } = rbxcad.transforms;
const { hull, hullChain } = rbxcad.hulls;

const getParameterDefinitions = () => [
	{
		name: "doHull",
		type: "radio",
		caption: "Show:",
		values: ["shapes", "hull", "chain"],
		captions: ["Original Shapes", "Hull", "Hull Chain"],
		initial: "shapes",
	},
];

const main = (params: { doHull: string }) => {
	const shapes = [
		translate([10, 0, 5], sphere({ radius: 2, segments: 16 })),
		translate([-3, 0, 0], sphere({ radius: 3.5, segments: 16 })),
		translate([0, 10, -3], sphere({ radius: 5, segments: 16 })),
		translate([5, 5, -10], cuboid({ size: [15, 17, 2] })),
	];
	if (params.doHull === "hull") {
		return hull(shapes);
	} else if (params.doHull === "chain") {
		return hullChain(shapes);
	} else {
		return shapes;
	}
};

export default main;
