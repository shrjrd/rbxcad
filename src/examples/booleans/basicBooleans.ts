import type { Geom3 } from "../../modeling/src/geometries/types";

import { colorize } from "../../modeling/src/colors";
import { intersect, subtract, union } from "../../modeling/src/operations/booleans";
import { translate } from "../../modeling/src/operations/transforms";
import { cube, sphere } from "../../modeling/src/primitives";

/**
 * Basic Booleans Demonstration
 * @category Manipulating Shapes
 * @skillLevel 2
 * @description Demonstrating the basics of boolean shape combinations
 * @tags cube, sphere, union, subtract, difference, subtraction, intersect, intersection
 * @authors Simon Clark
 * @licence MIT License
 */
const main = () => {
	const aCube = colorize([1, 0, 0], translate([-4.5, 0, 0], cube())) as Geom3;
	const aSphere = colorize([0, 1, 0], translate([-5.2, -0.8, 0.8], sphere({ segments: 32 }))) as Geom3;

	const aUnion = union(aCube, aSphere) as Geom3;
	const aSubtract = subtract(aCube, aSphere) as Geom3;
	const aIntersection = intersect(aCube, aSphere) as Geom3;
	return [
		aCube,
		aSphere,
		translate([3, 0, 0], aUnion),
		translate([6, 0, 0], aSubtract),
		translate([9, 0, 0], aIntersection),
	];
};

export default main;
