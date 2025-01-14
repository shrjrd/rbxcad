import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../../test/helpers";
import { geom3 } from "../../geometries";
import { measureAggregateBoundingBox, measureBoundingBox } from "../../measurements";
import { cube } from "../../primitives";
import { align } from "./index";

test("align: single object returns geometry unchanged if all axes are none", () => {
	const original = cube({ size: 4, center: [10, 10, 10] });
	const aligned = align({ modes: ["none", "none", "none"] }, original) as Geom3;
	const bounds = measureBoundingBox(aligned) as BoundingBox;
	const expectedBounds: BoundingBox = [
		[8, 8, 8],
		[12, 12, 12],
	];
	expect(() => geom3.validate(aligned)).never.toThrow();
	expect(comparePoints(bounds, expectedBounds)).toBe(true);
});

test("align: single objects returns geometry aligned, different modes on each axis", () => {
	const original = cube({ size: 4, center: [10, 10, 10] });
	const aligned = align({ modes: ["center", "min", "max"] }, original) as Geom3;
	const bounds = measureBoundingBox(aligned) as BoundingBox;
	const expectedBounds: BoundingBox = [
		[-2, 0, -4],
		[2, 4, 0],
	];
	expect(() => geom3.validate(aligned)).never.toThrow();
	expect(comparePoints(bounds, expectedBounds)).toBe(true);
});

test("align: unfilled modes and relativeTo arrays return results with expected values", () => {
	const original = cube({ size: 4, center: [10, 10, 10] });
	const aligned = align({ modes: ["center"], relativeTo: [0] }, original) as Geom3;
	const bounds = measureBoundingBox(aligned) as BoundingBox;
	const expectedBounds: BoundingBox = [
		[-2, 8, 8],
		[2, 12, 12],
	];
	expect(() => geom3.validate(aligned)).never.toThrow();
	expect(comparePoints(bounds, expectedBounds)).toBe(true);
});

test("align: multiple objects grouped returns geometry aligned, different modes on each axis", () => {
	const original = [cube({ size: 4, center: [10, 10, 10] }), cube({ size: 2, center: [4, 4, 4] })];
	const aligned = align(
		{ modes: ["center", "min", "max"], relativeTo: [6, -10, 0], grouped: true },
		original,
	) as Geom3[];
	const bounds = measureAggregateBoundingBox(aligned) as BoundingBox;
	const expectedBounds: BoundingBox = [
		[1.5, -10, -9],
		[10.5, -1, 0],
	];
	expect(() => geom3.validate(aligned[0])).never.toThrow();
	expect(() => geom3.validate(aligned[1])).never.toThrow();
	expect(comparePoints(bounds, expectedBounds)).toBe(true);
});

test("align: multiple objects ungrouped returns geometry aligned, different modes on each axis", () => {
	const original = [cube({ size: 4, center: [10, 10, 10] }), cube({ size: 2, center: [4, 4, 4] })];
	const aligned = align({ modes: ["center", "min", "max"], relativeTo: [30, 30, 30] }, original) as Geom3[];
	const bounds = measureAggregateBoundingBox(aligned) as BoundingBox;
	const expectedBounds: BoundingBox = [
		[28, 30, 26],
		[32, 34, 30],
	];
	expect(() => geom3.validate(aligned[0])).never.toThrow();
	expect(() => geom3.validate(aligned[1])).never.toThrow();
	expect(comparePoints(bounds, expectedBounds)).toBe(true);
});

test("align: multiple objects grouped, relativeTo is nulls, returns geometry unchanged", () => {
	const original = [cube({ size: 4, center: [10, 10, 10] }), cube({ size: 2, center: [4, 4, 4] })];
	const aligned = align(
		{
			modes: ["center", "min", "max"],
			relativeTo: ["", "", ""],
			grouped: true,
		},
		original,
	) as Geom3[];
	const bounds = measureAggregateBoundingBox(aligned) as BoundingBox;
	const expectedBounds: BoundingBox = [
		[3, 3, 3],
		[12, 12, 12],
	];
	expect(() => geom3.validate(aligned[0])).never.toThrow();
	expect(() => geom3.validate(aligned[1])).never.toThrow();
	expect(bounds).toEqual(expectedBounds); //expect(comparePoints(bounds, expectedBounds)).toBe(true);
});

test("align: multiple objects ungrouped, relativeTo is nulls, returns geometry aligned to group bounds", () => {
	const original = [cube({ size: 2, center: [4, 4, 4] }), cube({ size: 4, center: [10, 10, 10] })];
	const aligned = align(
		{
			modes: ["center", "min", "max"],
			relativeTo: ["", "", ""],
			grouped: false,
		},
		original,
	) as Geom3[];
	const bounds = measureAggregateBoundingBox(aligned) as BoundingBox;
	const expectedBounds: BoundingBox = [
		[5.5, 3, 8],
		[9.5, 7, 12],
	];
	expect(() => geom3.validate(aligned[0])).never.toThrow();
	expect(() => geom3.validate(aligned[1])).never.toThrow();
	expect(bounds).toEqual(expectedBounds); //expect(comparePoints(bounds, expectedBounds)).toBe(true);
});

test("align: throws errors on bad options", () => {
	const aCube = cube({ size: 4, center: [10, 10, 10] });
	expect(() => align({ grouped: 3 as unknown as boolean }, aCube)).toThrowError(); //({ instanceOf: Error });
	expect(() => align({ relativeTo: [3, 4, 9, 12] }, aCube)).toThrowError(); //({ instanceOf: Error });
	expect(() => align({ relativeTo: [3, 4, "dog"] }, aCube)).toThrowError(); //({ instanceOf: Error });
	expect(() => align({ modes: ["center", "max", "james"] }, aCube)).toThrowError(); //({ instanceOf: Error });
	expect(() => align({ modes: ["center", "max", "min", "none"] }, aCube)).toThrowError(); //({ instanceOf: Error });
});
