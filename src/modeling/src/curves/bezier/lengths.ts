import { Bezier } from "./type";
import { Array as JsArray, Number } from "@rbxts/luau-polyfill";

import { valueAt } from "./valueAt";

/**
 * Divides the bezier curve into line segments and returns the cumulative length of those segments as an array.
 * Utility function used to calculate the curve's approximate length and determine the equivalence between arc length and time.
 *
 * @example
 * const b = bezier.create([[0, 0], [0, 10]]);
 * const totalLength = lengths(100, b).pop(); // the last element of the array is the curve's approximate length
 *
 * @param {number} segments the number of segments to use when approximating the curve length.
 * @param {object} bezier a bezier curve.
 * @returns an array containing the cumulative length of the segments.
 */
export const lengths = (segments: number, bezier: Bezier) => {
	let sum = 0;
	const lengths = [0];
	let previous = valueAt(0, bezier) as number[];
	for (let index = 1; index <= segments; index++) {
		const current = valueAt(index / segments, bezier) as number[];
		sum += distanceBetween(current, previous);
		lengths.push(sum);
		previous = current;
	}
	return lengths;
};

/**
 * Calculates the Euclidean distance between two n-dimensional points.
 *
 * @example
 * const distance = distanceBetween([0, 0], [0, 10]); // calculate distance between 2D points
 * console.log(distance); // output 10
 *
 * @param {Array} a - first operand.
 * @param {Array} b - second operand.
 * @returns {number} - distance.
 */
const distanceBetween = (a: number[], b: number[]) => {
	if (Number.isFinite(a) && Number.isFinite(b)) {
		return math.abs(a - b);
	} else if (JsArray.isArray(a) && JsArray.isArray(b)) {
		if (a.size() !== b.size()) {
			throw "The operands must have the same number of dimensions.";
		}
		let sum = 0;
		for (let i = 0; i < a.size(); i++) {
			sum += (b[i] - a[i]) * (b[i] - a[i]);
		}
		return math.sqrt(sum);
	} else {
		throw "The operands must be of the same type, either number or array.";
	}
};
