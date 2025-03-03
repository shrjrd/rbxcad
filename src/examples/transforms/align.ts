import type { Geom3 } from "../../modeling/src/geometries/types";
import type { Vec3 } from "../../modeling/src/maths/types";

/**
 * Align function demonstration
 * @category Manipulating Shapes
 * @skillLevel 3
 * @description Demonstrating aligning shapes using the align function
 * @tags align, center, bottom, top, place
 * @authors Simon Clark
 * @licence MIT License
 */

import { subtract } from "../../modeling/src/operations/booleans";
import { align } from "../../modeling/src/operations/transforms";
import { cuboid } from "../../modeling/src/primitives";

const getParameterDefinitions = () => [
	{ name: "grouped", type: "checkbox", checked: false, caption: "Align as group" },
	{
		name: "modes",
		type: "choice",
		caption: "modes:",
		values: [
			'["none","none","none"]',
			'["center","center","min"]',
			'["min","min","min"]',
			'["max","min","center"]',
		],
		initial: '["none","none","none"]',
	},
	{
		name: "relativeTo",
		type: "choice",
		caption: "relativeTo:",
		values: ["[0,0,0]", "[null,null,null]", "[10,-10,0]"],
		initial: "[0,0,0]",
	},
];

/**
 * Generates a series of boxes of various sizes, and uses the align function to align them in different ways.
 * @param {Boolean} params.grouped - Treat all objects as a single object.
 * @param {String} params.modes - How to treat alignment on each axis.
 * @param {String} params.relativeTo - The relative point to align geometries. Null to use the group's bounding box.
 * @returns {geometry}
 */
const main = (params: {
	grouped?: boolean;
	modes?: ("center" | "max" | "min" | "none")[];
	relativeTo?: ("" | number)[];
}) => {
	const shapes = [
		cuboidFrame({ size: [2, 2, 2], center: [9, 4, 4] }),
		cuboidFrame({ size: [5, 12, 8], center: [8, 7, 10] }),
		cuboidFrame({ size: [6, 6, 6], center: [4, 7, 8] }),
		cuboidFrame({ size: [10, 10, 3], center: [8, 16, 10] }),
	];
	const modes = params.modes; //JSON.parse(params.modes);
	const relativeTo = params.relativeTo; //JSON.parse(params.relativeTo);
	const grouped = params.grouped;
	return align({ modes, relativeTo, grouped }, shapes) as Geom3[];
};

const cuboidFrame = (opt: { size: Vec3; center: Vec3 }) => {
	const d = 0.5;
	const center = opt.center;
	return subtract(
		cuboid(opt),
		cuboid({ size: [opt.size[0], opt.size[1] - d, opt.size[2] - d], center }),
		cuboid({ size: [opt.size[0] - d, opt.size[1], opt.size[2] - d], center }),
		cuboid({ size: [opt.size[0] - d, opt.size[1] - d, opt.size[2]], center }),
	) as Geom3;
};
export default main;
