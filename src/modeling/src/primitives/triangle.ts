import { Error, Object } from "@rbxts/luau-polyfill";

import geom2 from "../geometries/geom2";
import { NEPS } from "../maths/constants";
import vec2 from "../maths/vec2";
import { isNumberArray } from "./commonChecks";

// returns angle C
const solveAngleFromSSS = (a: number, b: number, c: number) => math.acos((a * a + b * b - c * c) / (2 * a * b));

// returns side c
const solveSideFromSAS = (a: number, C: number, b: number) => {
	if (C > NEPS) {
		return math.sqrt(a * a + b * b - 2 * a * b * math.cos(C));
	}

	// Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
	return math.sqrt((a - b) * (a - b) + a * b * C * C * (1 - (C * C) / 12));
};

// AAA is when three angles of a triangle, but no sides
const solveAAA = (angles: number[]) => {
	const eps = math.abs(angles[0] + angles[1] + angles[2] - math.pi);
	if (eps > NEPS) throw new Error("AAA triangles require angles that sum to PI");

	const A = angles[0];
	const B = angles[1];
	const C = math.pi - A - B;

	// Note: This is not 100% proper but...
	// default the side c length to 1
	// solve the other lengths
	const c = 1;
	const a = (c / math.sin(C)) * math.sin(A);
	const b = (c / math.sin(C)) * math.sin(B);
	return createTriangle(A, B, C, a, b, c);
};

// AAS is when two angles and one side are known, and the side is not between the angles
const solveAAS = (values: number[]) => {
	const A = values[0];
	const B = values[1];
	const C = math.pi + NEPS - A - B;

	if (C < NEPS) throw new Error("AAS triangles require angles that sum to PI");

	const a = values[2];
	const b = (a / math.sin(A)) * math.sin(B);
	const c = (a / math.sin(A)) * math.sin(C);
	return createTriangle(A, B, C, a, b, c);
};

// ASA is when two angles and the side between the angles are known
const solveASA = (values: number[]) => {
	const A = values[0];
	const B = values[2];
	const C = math.pi + NEPS - A - B;

	if (C < NEPS) throw new Error("ASA triangles require angles that sum to PI");

	const c = values[1];
	const a = (c / math.sin(C)) * math.sin(A);
	const b = (c / math.sin(C)) * math.sin(B);
	return createTriangle(A, B, C, a, b, c);
};

// SAS is when two sides and the angle between them are known
const solveSAS = (values: number[]) => {
	const c = values[0];
	const B = values[1];
	const a = values[2];

	const b = solveSideFromSAS(c, B, a);

	const A = solveAngleFromSSS(b, c, a); // solve for A
	const C = math.pi - A - B;
	return createTriangle(A, B, C, a, b, c);
};

// SSA is when two sides and an angle that is not the angle between the sides are known
const solveSSA = (values: number[]) => {
	const c = values[0];
	const a = values[1];
	const C = values[2];

	const A = math.asin((a * math.sin(C)) / c);
	const B = math.pi - A - C;

	const b = (c / math.sin(C)) * math.sin(B);
	return createTriangle(A, B, C, a, b, c);
};

// SSS is when we know three sides of the triangle
const solveSSS = (lengths: number[]) => {
	const a = lengths[1];
	const b = lengths[2];
	const c = lengths[0];
	if (a + b <= c || b + c <= a || c + a <= b) {
		throw new Error("SSS triangle is incorrect, as the longest side is longer than the sum of the other sides");
	}

	const A = solveAngleFromSSS(b, c, a); // solve for A
	const B = solveAngleFromSSS(c, a, b); // solve for B
	const C = math.pi - A - B;
	return createTriangle(A, B, C, a, b, c);
};

const createTriangle = (A: number, B: number, C: number, a: number, b: number, c: number) => {
	const p0 = vec2.fromValues(0, 0); // everything starts from 0, 0
	const p1 = vec2.fromValues(c, 0);
	const p2 = vec2.fromValues(a, 0);
	vec2.add(p2, vec2.rotate(p2, p2, [0, 0], math.pi - B), p1);
	return geom2.fromPoints([p0, p1, p2]);
};

type TriangleOptions = {
	_type: string;
	values: number[];
};
/**
 * Construct a triangle in two dimensional space from the given options.
 * The triangle is always constructed CCW from the origin, [0, 0, 0].
 * @see https://www.mathsisfun.com/algebra/trig-solving-triangles.html
 * @param {Object} [options] - options for construction
 * @param {String} [options.type='SSS'] - type of triangle to construct; A ~ angle, S ~ side
 * @param {Array} [options.values=[1,1,1]] - angle (radians) of corners or length of sides
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.triangle
 *
 * @example
 * let myshape = triangle({type: 'AAS', values: [degToRad(62), degToRad(35), 7]})
 */
const triangle = (options?: TriangleOptions) => {
	const defaults = {
		_type: "SSS",
		values: [1, 1, 1],
	};
	// eslint-disable-next-line prefer-const
	let { _type, values } = Object.assign({}, defaults, options);

	if (typeOf(_type) !== "string") throw new Error("triangle type must be a string");
	_type = _type.upper(); //type.toUpperCase();
	const t1 = string.sub(_type, 1, 1);
	const t2 = string.sub(_type, 2, 2);
	const t3 = string.sub(_type, 3, 3);

	if (
		!(
			(t1 === "A" || t1 === "S") && //(type[0] === "A" || type[0] === "S") &&
			(t2 === "A" || t2 === "S") && //(type[1] === "A" || type[1] === "S") &&
			(t3 === "A" || t3 === "S") //(type[2] === "A" || type[2] === "S")
		)
	)
		throw new Error("triangle type must contain three letters; A or S");

	if (!isNumberArray(values, 3)) throw new Error("triangle values must contain three values");
	if (!values.every((n) => n > 0)) throw new Error("triangle values must be greater than zero");

	switch (_type) {
		case "AAA":
			return solveAAA(values);
		case "AAS":
			return solveAAS(values);
		case "ASA":
			return solveASA(values);
		case "SAS":
			return solveSAS(values);
		case "SSA":
			return solveSSA(values);
		case "SSS":
			return solveSSS(values);
		default:
			throw new Error("invalid triangle type, try again");
	}
};

export default triangle;
