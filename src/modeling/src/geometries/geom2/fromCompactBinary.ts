import type { Geom2 } from "../types";
import type { Mat4 } from "../../maths/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import * as mat4 from "../../maths/mat4/index";
import * as vec2 from "../../maths/vec2/index";
import { create } from "./create";

/**
 * Create a new 2D geometry from the given compact binary data.
 * @param {Array} data - compact binary data
 * @returns {Geom2} a new geometry
 * @alias module:modeling/geometries/geom2.fromCompactBinary
 */
export const fromCompactBinary = (data: number[]) => {
	if (data[0] !== 0) throw "invalid compact binary data";

	const created = create();

	created.transforms = mat4.clone(JsArray.slice(data, 2, 18) as Mat4); //mat4.clone(data.slice(1, 17));

	for (let i = 21; i < data.size(); ) {
		const length = data[i++]; // number of points for this polygon
		if (length < 0 || i + length * 2 > data.size()) {
			throw "invalid compact binary data";
		}
		const outline = [];
		for (let j = 0; j < length; j++) {
			const x = data[i + j * 2];
			const y = data[i + j * 2 + 1];
			outline.push(vec2.fromValues(x, y));
		}
		created.outlines.push(outline);
		i += length * 2;
	}

	// transfer known properties, i.e. color
	if (data[17] >= 0) {
		created.color = [data[17], data[18], data[19], data[20]];
	}
	// TODO: how about custom properties or fields ?
	return created;
};
