import { Array, Error, Number } from "@rbxts/luau-polyfill";
/**
 * Represents a bezier easing function.
 * @typedef {Object} bezier
 * @property {Array} points - The control points for the bezier curve. The first and last point will also be the start and end of the curve
 * @property {string} pointType - A reference to the type and dimensionality of the points that the curve was created from
 * @property {number} dimensions - The dimensionality of the bezier
 * @property {Array} permutations - A pre-calculation of the bezier algorithm's co-efficients
 * @property {Array} tangentPermutations - A pre-calculation of the bezier algorithm's tangent co-efficients
 *
 */

/**
 * Creates an object representing a bezier easing curve.
 * Curves can have both an arbitrary number of control points, and an arbitrary number of dimensions.
 *
 * @example
 * const b = bezier.create([0,10]) // a linear progression from 0 to 10
 * const b = bezier.create([0, 0, 10, 10]) // a symmetrical cubic easing curve that starts slowly and ends slowly from 0 to 10
 * const b = bezier.create([0,0,0], [0,5,10], [10,0,-5], [10,10,10]]) // a cubic 3 dimensional easing curve that can generate position arrays for modelling
 * // Usage
 * let position = bezier.valueAt(t,b) // where 0 < t < 1
 * let tangent = bezier.tangentAt(t,b) // where 0 < t < 1
 *
 * @param {Array} points An array with at least 2 elements of either all numbers, or all arrays of numbers that are the same size.
 * @returns {bezier} a new bezier data object
 * @alias module:modeling/curves/bezier.create
 */
const create = (points: number[] | number[][]): Bezier => {
	if (!Array.isArray(points)) throw new Error("Bezier points must be a valid array/");
	if (points.size() < 2) throw new Error("Bezier points must contain at least 2 values.");
	const pointType = getPointType(points);

	return {
		points: points,
		pointType: pointType,
		dimensions: pointType === "float_single" ? 0 : (points[0] as number[]).size(), //points[0].size(),
		permutations: getPermutations(points.size() - 1),
		tangentPermutations: getPermutations(points.size() - 2),
	};
};

const getPointType = function (points: number[] | number[][]) {
	let firstPointType: unknown | string = undefined;
	points.forEach((point) => {
		let pType = "";
		if (Number.isFinite(point)) {
			pType = "float_single";
		} else if (Array.isArray(point)) {
			point.forEach((val) => {
				if (!Number.isFinite(val)) throw new Error("Bezier point values must all be numbers.");
			});
			pType = "float_" + point.size();
		} else throw new Error("Bezier points must all be numbers or arrays of number.");
		if (firstPointType === undefined) {
			firstPointType = pType;
		} else {
			if (firstPointType !== pType) {
				throw new Error("Bezier points must be either all numbers or all arrays of numbers of the same size.");
			}
		}
	});
	return firstPointType as string;
};

const getPermutations = function (c: number) {
	const permutations = [];
	for (let i = 0; i <= c; i++) {
		permutations.push(factorial(c) / (factorial(i) * factorial(c - i)));
	}
	return permutations;
};

const factorial = function (b: number) {
	let out = 1;
	for (let i = 2; i <= b; i++) {
		out *= i;
	}
	return out;
};

export default create;
