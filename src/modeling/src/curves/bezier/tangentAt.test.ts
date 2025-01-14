import { expect, test } from "@rbxts/jest-globals";

import { bezier } from "../index";

test("Linear bezier (straight line between two points)", () => {
	const straightLine = bezier.create([10, 20]);
	expect(bezier.tangentAt(0, straightLine)).toBe(10);
	expect(bezier.tangentAt(0.5, straightLine)).toBe(10);
	expect(bezier.tangentAt(1, straightLine)).toBe(10);
});

test("bezier with non-numbers throws error", () => {
	expect(() => bezier.create(["what", 20] as unknown as number[])).toThrowError(); //({ instanceOf: Error });
});

test("quadratic bezier (3 control points)", () => {
	const OneDCurve = bezier.create([0, 10, 20]);
	expect(bezier.tangentAt(0, OneDCurve)).toBe(20);
	expect(bezier.tangentAt(0.5, OneDCurve)).toBe(20);
	expect(bezier.tangentAt(1, OneDCurve)).toBe(20);
});

test("quadratic bezier (3 control points, non symmetric)", () => {
	const OneDCurve = bezier.create([0, 0, 20]);
	expect(bezier.tangentAt(0, OneDCurve)).toBe(0);
	expect(bezier.tangentAt(0.5, OneDCurve)).toBe(20);
	expect(bezier.tangentAt(1, OneDCurve)).toBe(40);
});

test("quadratic bezier (4 control points)", () => {
	const OneDCurve = bezier.create([0, 0, 20, 20]);
	expect(bezier.tangentAt(0, OneDCurve)).toBe(0);
	expect(bezier.tangentAt(0.5, OneDCurve)).toBe(30);
	expect(bezier.tangentAt(1, OneDCurve)).toBe(0);
});

test("bezier with numbers and array of numbers throws error", () => {
	expect(() => bezier.create([[0, 5, 10], 20] as unknown as number[][])).toThrowError(); //({ instanceOf: Error });
});

test("bezier with array of numbers of different size throws error", () => {
	expect(() =>
		bezier.create([
			[0, 5, 10],
			[20, 0],
		]),
	).toThrowError(); //({ instanceOf: Error });
});

test("quadratic bezier one dimension, 3 control points", () => {
	const OneDCurve = bezier.create([[0], [10], [20]]);
	expect(bezier.tangentAt(0, OneDCurve)).toEqual([20]);
	expect(bezier.tangentAt(0.5, OneDCurve)).toEqual([20]);
	expect(bezier.tangentAt(1, OneDCurve)).toEqual([20]);
});

test("quadratic bezier 2 dimensions, 3 control points", () => {
	const TwoDCurve = bezier.create([
		[0, 10],
		[30, 10],
		[60, 20],
	]);
	expect(bezier.tangentAt(0, TwoDCurve)).toEqual([60, 0]);
	expect(bezier.tangentAt(0.5, TwoDCurve)).toEqual([60, 10]);
	expect(bezier.tangentAt(1, TwoDCurve)).toEqual([60, 20]);
});

test("bezier throws error when t is not between 0 and 1", () => {
	const straightLine = bezier.create([0, 20]);
	expect(() => bezier.tangentAt(-2, straightLine)).toThrowError(); //({ instanceOf: Error });
	expect(() => bezier.tangentAt(1.1, straightLine)).toThrowError(); //({ instanceOf: Error });
});
