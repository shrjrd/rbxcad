import type { Geom3 } from "../../modeling/src/geometries/types";

import { intersect } from "../../modeling/src/operations/booleans";
import { rotateX, rotateZ, scale } from "../../modeling/src/operations/transforms";
import { cuboid } from "../../modeling/src/primitives";
import { degToRad } from "../../modeling/src/utils";

/**
 * Building a Dodecahedron
 * @category Creating Shapes
 * @skillLevel 2
 * @description building dodecahedron() from cuboids
 * @tags cuboid, primitive, boolean, intersect, dodecahedron
 * @authors Rene K. Mueller
 * @reference http://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Commented_Example_Projects
 * @licence MIT License
 */
const dodecahedron = (h: number) => {
	let cuboid1 = cuboid({ size: [20, 20, 10] });
	for (let i = 0; i <= 4; i++) {
		// loop i from 0 to 4, and intersect results
		// make a cube, rotate it 116.565 degrees around the X axis,
		// then 72*i around the Z axis
		cuboid1 = intersect(
			cuboid1,
			rotateZ(i * degToRad(72), rotateX(degToRad(116.565), cuboid({ size: [20, 20, 10] }))) as Geom3,
		) as Geom3;
	}
	return scale([h, h, h], cuboid1); // scale by height parameter
};

const main = () => dodecahedron(10);

export default main;
