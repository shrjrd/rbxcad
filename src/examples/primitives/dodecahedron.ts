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

import rbxcad from "../../modeling/src";
const { cuboid } = rbxcad.primitives;
const { intersect } = rbxcad.booleans;
const { rotateX, rotateZ, scale } = rbxcad.transforms;
const { degToRad } = rbxcad.utils;

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
