import type { Geom2 } from "../types";
import type { Vec2, Mat4 } from "../../maths/types";
import { Number } from "@rbxts/luau-polyfill";

const Vec2ToString = (v: Vec2) => `[${v[0]},${v[1]}]`;

const Mat4ToString = (m: Mat4) => {
	return `[${m[0]},${m[1]},${m[2]},${m[3]},${m[4]},${m[5]},${m[6]},${m[7]},${m[8]},${m[9]},${m[10]},${m[11]},${m[12]},${m[13]},${m[14]},${m[15]}]`;
};

import { intersect } from "../../maths/utils/intersect";
import * as vec2 from "../../maths/vec2/index";
import { isA } from "./isA";
import { toOutlines } from "./toOutlines";

/**
 * Determine if the given object is a valid geom2.
 * Checks for closedness, self-edges, and valid data points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/geom2.validate
 */
export const validate = (object: Geom2) => {
	if (!isA(object)) {
		throw "invalid geom2 structure";
	}

	object.outlines.forEach((outline, i) => {
		if (outline.size() < 3) {
			throw `geom2 outline ${i} must contain at least 3 points`;
		}
		// check for duplicate points
		for (let i = 0; i < outline.size(); i++) {
			const j = (i + 1) % outline.size();
			if (vec2.equals(outline[i], outline[j])) {
				throw `geom2 outline ${i} has duplicate point ${Vec2ToString(outline[i])}`;
			}
		}
	});

	// check for self-intersection
	toOutlines(object).forEach((outline, i) => {
		// check for intersection between [a1, a2] and [b1, b2]
		for (let a1 = 0; a1 < outline.size(); a1++) {
			const a2 = (a1 + 1) % outline.size();
			for (let b1 = 0; b1 < outline.size(); b1++) {
				const b2 = (b1 + 1) % outline.size();
				if (a1 !== b1) {
					const int = intersect(outline[a1], outline[a2], outline[b1], outline[b2], false);
					if (int) {
						throw `geom2 outline ${i} self intersection at ${Vec2ToString(int)}`;
					}
				}
			}
		}
	});

	// check transforms
	if (!object.transforms.every(Number.isFinite)) {
		throw `geom2 invalid transforms ${Mat4ToString(object.transforms)}`;
	}
};
