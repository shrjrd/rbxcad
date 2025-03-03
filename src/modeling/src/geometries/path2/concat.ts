import type { Path2 } from "../types";
import type { Vec2 } from "../../maths/types";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import { equals } from "../../maths/vec2/index";
import { fromPoints } from "./fromPoints";
import { toPoints } from "./toPoints";

/**
 * Concatenate the given paths.
 *
 * If both contain the same point at the junction, merge it into one.
 * A concatenation of zero paths is an empty, open path.
 * A concatenation of one closed path to a series of open paths produces a closed path.
 * A concatenation of a path to a closed path is an error.
 * @param {...Path2} paths - the paths to concatenate
 * @returns {Path2} a new path
 * @alias module:modeling/geometries/path2.concat
 *
 * @example
 * let newPath = concat(fromPoints({}, [[1, 2]]), fromPoints({}, [[3, 4]]))
 */
export const concat = (...paths: Path2[]) => {
	// Only the last path can be closed, producing a closed path.
	let isClosed = false;
	let newPoints: Vec2[] = [];
	paths.forEach((path, i) => {
		const tmp = JsArray.slice(toPoints(path)); //toPoints(path).slice();
		if (newPoints.size() > 0 && tmp.size() > 0 && equals(tmp[0], newPoints[newPoints.size() - 1])) tmp.shift();
		if (tmp.size() > 0 && isClosed) {
			throw `Cannot concatenate to a closed path; check the ${i}th path`;
		}
		isClosed = path.isClosed;
		newPoints = JsArray.concat(newPoints, tmp);
	});
	return fromPoints({ closed: isClosed }, newPoints);
};
