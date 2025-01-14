import { Array, Error } from "@rbxts/luau-polyfill";

import mat4 from "../../maths/mat4";
import vec2 from "../../maths/vec2";
import create from "./create";

/**
 * Create a new path from the given compact binary data.
 * @param {TypedArray} data - compact binary data
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.fromCompactBinary
 */
const fromCompactBinary = (data: number[]) => {
	if (data[0] !== 2) throw new Error("invalid compact binary data");

	const created = create();

	created.transforms = mat4.clone(Array.slice(data, 2, 18) as Mat4); //mat4.clone(data.slice(1, 17));

	created.isClosed = !!data[17];

	for (let i = 22; i < data.size(); i += 2) {
		const point = vec2.fromValues(data[i], data[i + 1]);
		created.points.push(point);
	}
	// transfer known properties, i.e. color
	if (data[18] >= 0) {
		created.color = [data[18], data[19], data[20], data[21]];
	}
	// TODO: how about custom properties or fields ?
	return created;
};

export default fromCompactBinary;
