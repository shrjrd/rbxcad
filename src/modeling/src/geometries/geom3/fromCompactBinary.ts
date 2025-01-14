import { Array, Error } from "@rbxts/luau-polyfill";

import mat4 from "../../maths/mat4";
import vec3 from "../../maths/vec3";
import poly3 from "../poly3";
import create from "./create";

/**
 * Construct a new 3D geometry from the given compact binary data.
 * @param {TypedArray} data - compact binary data
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.fromCompactBinary
 */
const fromCompactBinary = (data: number[]) => {
	if (data[0] !== 1) throw new Error("invalid compact binary data");

	const created = create();

	created.transforms = mat4.clone(Array.slice(data, 2, 18) as Mat4); //mat4.clone(data.slice(1, 17));

	const numberOfVertices = data[21];
	let ci = 22;
	let vi = data.size() - numberOfVertices * 3;
	while (vi < data.size()) {
		const verticesPerPolygon = data[ci];
		ci++;

		const vertices = [];
		for (let i = 0; i < verticesPerPolygon; i++) {
			vertices.push(vec3.fromValues(data[vi], data[vi + 1], data[vi + 2]));
			vi += 3;
		}
		created.polygons.push(poly3.create(vertices));
	}

	// transfer known properties, i.e. color
	if (data[17] >= 0) {
		created.color = [data[17], data[18], data[19], data[20]];
	}
	// TODO: how about custom properties or fields ?
	return created;
};

export default fromCompactBinary;
