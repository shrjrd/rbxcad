import vec2 from "../../maths/vec2";
import toPoints from "./toPoints";

/**
 * Create a string representing the contents of the given path.
 * @param {path2} geometry - the path
 * @returns {String} a representative string
 * @alias module:modeling/geometries/path2.toString
 *
 * @example
 * console.out(toString(path))
 */
const toString = (geometry: Path2): string => {
	const points = toPoints(geometry);
	let result = "path (" + points.size() + " points, " + geometry.isClosed + "):\n[\n";
	points.forEach((point: Vec2) => {
		result += "  " + vec2.toString(point) + ",\n";
	});
	result += "]\n";
	return result;
};

export default toString;
