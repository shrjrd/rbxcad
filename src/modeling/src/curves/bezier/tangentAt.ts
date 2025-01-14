/**
 * Calculates the tangent at a specific position along a bezier easing curve.
 * For multidimensional curves, the tangent is the slope of each dimension at that point.
 * See the example called extrudeAlongPath.js
 *
 * @example
 * const b = bezier.create([[0,0,0], [0,5,10], [10,0,-5], [10,10,10]]) // a cubic 3 dimensional easing curve that can generate position arrays for modelling
 * let tangent = bezier.tangentAt(t, b)
 *
 * @param {number} t : the position of which to calculate the bezier's tangent value; 0 < t < 1
 * @param {Object} bezier : an array with at least 2 elements of either all numbers, or all arrays of numbers that are the same size.
 * @return {array | number} the tangent at the requested position.
 * @alias module:modeling/curves/bezier.tangentAt
 */
const tangentAt = (t: number, bezier: Bezier) => {
	if (t < 0 || t > 1) {
		throw "Bezier tangentAt() input must be between 0 and 1";
	}
	if (bezier.pointType === "float_single") {
		return bezierTangent(bezier, bezier.points as number[], t);
	} else {
		const result = [];
		for (let i = 0; i < bezier.dimensions; i++) {
			const singleDimensionPoints = [];
			for (let j = 0; j < bezier.points.size(); j++) {
				singleDimensionPoints.push((bezier.points as number[][])[j][i]);
			}
			result.push(bezierTangent(bezier, singleDimensionPoints, t));
		}
		return result;
	}
};

const bezierTangent = function (bezier: Bezier, p: number[], t: number) {
	// from https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/Bezier/bezier-der.html
	const n = p.size() - 1;
	let result = 0;
	for (let i = 0; i < n; i++) {
		const q = n * (p[i + 1] - p[i]);
		result += bezier.tangentPermutations[i] * math.pow(1 - t, n - 1 - i) * math.pow(t, i) * q;
	}
	return result;
};

export default tangentAt;
