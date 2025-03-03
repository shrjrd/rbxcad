import type { Mat4 } from "../../maths/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as mat4 from "../../maths/mat4/index";
import * as vec2 from "../../maths/vec2/index";
import { create } from "./create";

/**
 * Create a new path from the given compact binary data.
 * @param {TypedArray} data - compact binary data
 * @returns {Path2} a new path
 * @alias module:modeling/geometries/path2.fromCompactBinary
 */
export const fromCompactBinary = (data: number[]) => {
	if (data[0] !== 2) throw "invalid compact binary data";

	const created = create();

	created.transforms = mat4.clone(JsArray.slice(data, 2, 18) as Mat4); //mat4.clone(data.slice(1, 17));
	// DEVIATION: 0, NaN, and "" are falsy in TS.
	//created.isClosed = !!data[17];
	created.isClosed = !!(data[17] !== 0 && data[17] !== undefined);

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
