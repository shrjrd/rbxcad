import { expect, test } from "@rbxts/jest-globals";

import { bezier } from "../index";

test("Linear bezier (straight line between two points)", () => {
	const straightLine = bezier.create([10, 20]);
	expect(straightLine.points).toEqual([10, 20]);
	expect(straightLine.pointType).toBe("float_single");
	expect(straightLine.permutations).toEqual([1, 1]);
	expect(straightLine.tangentPermutations).toEqual([1]);
	expect(straightLine.dimensions).toBe(0);
});

test("bezier with non-numbers throws error", () => {
	//expect(() => bezier.create(["what", 20])).toThrowError(); //({ instanceOf: Error });
	expect(() => bezier.create(["what", 20] as unknown as number[])).toThrowError();
});

test("quadratic bezier (3 control points)", () => {
	const OneDCurve = bezier.create([0, 10, 20]);
	expect(OneDCurve.points).toEqual([0, 10, 20]);
	expect(OneDCurve.pointType).toBe("float_single");
	expect(OneDCurve.permutations).toEqual([1, 2, 1]);
	expect(OneDCurve.tangentPermutations).toEqual([1, 1]);
	expect(OneDCurve.dimensions).toBe(0);
});

test("quadratic bezier (4 control points)", () => {
	const OneDCurve = bezier.create([0, 0, 20, 20]);
	expect(OneDCurve.points).toEqual([0, 0, 20, 20]);
	expect(OneDCurve.pointType).toBe("float_single");
	expect(OneDCurve.permutations).toEqual([1, 3, 3, 1]);
	expect(OneDCurve.tangentPermutations).toEqual([1, 2, 1]);
	expect(OneDCurve.dimensions).toBe(0);
});

test("bezier with numbers and array of numbers throws error", () => {
	//expect(() => bezier.create([[0, 5, 10], 20])).toThrowError(); //({ instanceOf: Error });
	expect(() => bezier.create([[0, 5, 10], 20] as unknown as number[][])).toThrowError();
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
	expect(OneDCurve.points).toEqual([[0], [10], [20]]);
	expect(OneDCurve.pointType).toBe("float_1");
	expect(OneDCurve.permutations).toEqual([1, 2, 1]);
	expect(OneDCurve.tangentPermutations).toEqual([1, 1]);
	expect(OneDCurve.dimensions).toBe(1);
});

test("quadratic bezier 2 dimensions, 3 control points", () => {
	const TwoDCurve = bezier.create([
		[0, 10],
		[30, 10],
		[60, 20],
	]);
	expect(TwoDCurve.points).toEqual([
		[0, 10],
		[30, 10],
		[60, 20],
	]);
	expect(TwoDCurve.pointType).toBe("float_2");
	expect(TwoDCurve.permutations).toEqual([1, 2, 1]);
	expect(TwoDCurve.tangentPermutations).toEqual([1, 1]);
	expect(TwoDCurve.dimensions).toBe(2);
});
