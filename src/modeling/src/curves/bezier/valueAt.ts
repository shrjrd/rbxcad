/**
 * Calculates the value at a specific position along a bezier easing curve.
 * For multidimensional curves, the tangent is the slope of each dimension at that point.
 * See the example called extrudeAlongPath.js to see this in use.
 * Math and explanation comes from {@link https://www.freecodecamp.org/news/nerding-out-with-bezier-curves-6e3c0bc48e2f/}
 *
 * @example
 * const b = bezier.create([0,0,0], [0,5,10], [10,0,-5], [10,10,10]]) // a cubic 3 dimensional easing curve that can generate position arrays for modelling
 * let position = bezier.valueAt(t,b) // where 0 < t < 1
 *
 * @param {number} t : the position of which to calculate the value; 0 < t < 1
 * @param {Object} bezier : a bezier curve created with bezier.create().
 * @returns {array | number} the value at the requested position.
 * @alias module:modeling/curves/bezier.valueAt
 */
const valueAt = (t: number, bezier: Bezier) => {
	if (t < 0 || t > 1) {
		throw "Bezier valueAt() input must be between 0 and 1";
	}
	if (bezier.pointType === "float_single") {
		return bezierFunction(bezier, bezier.points as number[], t);
	} else {
		const result = [];
		for (let i = 0; i < bezier.dimensions; i++) {
			const singleDimensionPoints = [];
			for (let j = 0; j < bezier.points.size(); j++) {
				singleDimensionPoints.push((bezier.points as number[][])[j][i]);
			}
			result.push(bezierFunction(bezier, singleDimensionPoints, t));
		}
		return result;
	}
};

const bezierFunction = function (bezier: Bezier, p: number[], t: number) {
	const n = p.size() - 1;
	let result = 0;
	for (let i = 0; i <= n; i++) {
		result += bezier.permutations[i] * math.pow(1 - t, n - i) * math.pow(t, i) * p[i];
	}
	return result;
};

export default valueAt;
