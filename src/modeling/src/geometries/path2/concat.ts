import { Array, Error } from "@rbxts/luau-polyfill";

import { equals } from "../../maths/vec2";
import fromPoints from "./fromPoints";
import toPoints from "./toPoints";

/**
 * Concatenate the given paths.
 *
 * If both contain the same point at the junction, merge it into one.
 * A concatenation of zero paths is an empty, open path.
 * A concatenation of one closed path to a series of open paths produces a closed path.
 * A concatenation of a path to a closed path is an error.
 * @param {...path2} paths - the paths to concatenate
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.concat
 *
 * @example
 * let newpath = concat(fromPoints({}, [[1, 2]]), fromPoints({}, [[3, 4]]))
 */
const concat = (...paths: Path2[]) => {
	// Only the last path can be closed, producing a closed path.
	let isClosed = false;
	let newpoints: Vec2[] = [];
	paths.forEach((path, i) => {
		const tmp = Array.slice(toPoints(path)); //toPoints(path).slice();
		if (newpoints.size() > 0 && tmp.size() > 0 && equals(tmp[0], newpoints[newpoints.size() - 1])) tmp.shift();
		if (tmp.size() > 0 && isClosed) {
			throw new Error(`Cannot concatenate to a closed path; check the ${i}th path`);
		}
		isClosed = path.isClosed;
		newpoints = Array.concat(newpoints, tmp); //newpoints.concat(tmp);
	});
	return fromPoints({ closed: isClosed }, newpoints);
};

export default concat;
