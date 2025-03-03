import type { Geom2, Path2 } from "../../modeling/src/geometries/types";

import { colorize, colorNameToRgb, RGB } from "../../modeling/src/colors";
import { offset } from "../../modeling/src/operations/offsets";
import { arc, rectangle } from "../../modeling/src/primitives";

/**
 * Offsetting 2D Shapes
 * @category Manipulating Shapes
 * @skillLevel 5
 * @description Demonstrating the offset() function. Moves all points in a 2d path or 2D geometry perpendicular to the line's tangent.
 * @tags offset, expansion
 * @authors Moissette Mark, Simon Clark
 * @licence MIT License
 */
const main = () => {
	// 2d paths can be offset
	const path2Example = colorize(
		colorNameToRgb("black") as RGB,
		arc({ radius: 15, startAngle: math.pi / 4, endAngle: (3 * math.pi) / 4 }),
	) as Path2;
	const expandedPath2Rounded = colorize(
		colorNameToRgb("red") as RGB,
		offset({ delta: 2, corners: "round" }, path2Example),
	);

	// 2d geometry can also be offset
	const geom2Example = colorize(colorNameToRgb("black") as RGB, rectangle({ size: [16, 16] })) as Geom2;

	const contractedGeom2 = colorize(
		colorNameToRgb("blue") as RGB,
		offset({ delta: -2, corners: "round", segments: 8 }, geom2Example),
	);
	const expandedGeom2Chamfered = colorize(
		colorNameToRgb("red") as RGB,
		offset({ delta: 1.8, corners: "chamfer", segments: 8 }, geom2Example),
	);
	const expandedGeom2Rounded = colorize(
		colorNameToRgb("red") as RGB,
		offset({ delta: 2, corners: "round", segments: 32 }, geom2Example),
	);
	const expandedGeom2Edged = colorize(
		colorNameToRgb("red") as RGB,
		offset({ delta: 2.2, corners: "edge", segments: 8 }, geom2Example),
	);

	// 3d geometry can not be offset yet.

	return [
		path2Example,
		expandedPath2Rounded,

		geom2Example,
		expandedGeom2Chamfered,
		expandedGeom2Rounded,
		expandedGeom2Edged,
		contractedGeom2,
	];
};

export default main;
