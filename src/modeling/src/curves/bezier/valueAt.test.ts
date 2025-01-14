import { expect, test } from "@rbxts/jest-globals";

import { bezier } from "../index";

test("Linear bezier (straight line between two points)", () => {
	const straightLine = bezier.create([10, 20]);
	expect(bezier.valueAt(0, straightLine)).toBe(10);
	expect(bezier.valueAt(0.5, straightLine)).toBe(15);
	expect(bezier.valueAt(1, straightLine)).toBe(20);
});

test("bezier with non-numbers throws error", () => {
	expect(() => bezier.create(["what", 20] as unknown as number[])).toThrowError(); //({ instanceOf: Error });
});

test("quadratic bezier (3 control points)", () => {
	const OneDCurve = bezier.create([0, 10, 20]);
	expect(bezier.valueAt(0, OneDCurve)).toBe(0);
	expect(bezier.valueAt(0.5, OneDCurve)).toBe(10);
	expect(bezier.valueAt(1, OneDCurve)).toBe(20);
});

test("quadratic bezier (3 control points, non symmetric)", () => {
	const OneDCurve = bezier.create([0, 0, 20]);
	expect(bezier.valueAt(0, OneDCurve)).toBe(0);
	expect(bezier.valueAt(0.5, OneDCurve)).toBe(5);
	expect(bezier.valueAt(1, OneDCurve)).toBe(20);
});

test("quadratic bezier (4 control points)", () => {
	const OneDCurve = bezier.create([0, 0, 20, 20]);
	expect(bezier.valueAt(0, OneDCurve)).toBe(0);
	expect(bezier.valueAt(0.5, OneDCurve)).toBe(10);
	expect(bezier.valueAt(1, OneDCurve)).toBe(20);
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
	expect(bezier.valueAt(0, OneDCurve)).toEqual([0]);
	expect(bezier.valueAt(0.5, OneDCurve)).toEqual([10]);
	expect(bezier.valueAt(1, OneDCurve)).toEqual([20]);
});

test("quadratic bezier 2 dimensions, 3 control points", () => {
	const TwoDCurve = bezier.create([
		[0, 10],
		[30, 10],
		[60, 20],
	]);
	expect(bezier.valueAt(0, TwoDCurve)).toEqual([0, 10]);
	expect(bezier.valueAt(0.5, TwoDCurve)).toEqual([30, 12.5]);
	expect(bezier.valueAt(1, TwoDCurve)).toEqual([60, 20]);
});

test("bezier throws error when t is not between 0 and 1", () => {
	const straightLine = bezier.create([0, 20]);
	expect(() => bezier.valueAt(-2, straightLine)).toThrowError(); //({ instanceOf: Error });
	expect(() => bezier.valueAt(1.1, straightLine)).toThrowError(); //({ instanceOf: Error });
});
