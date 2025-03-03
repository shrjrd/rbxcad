import type { Geom2 } from "../../geometries/types";
import type { Vec2 } from "../../maths/types";
import type { BoundingBox } from "../../measurements/types";
import { expect, test } from "@rbxts/jest-globals";

import { comparePoints, nearlyEqual } from "../../../test/helpers/index";
import { colorize } from "../../colors/index";
import { geom2, path2 } from "../../geometries/index";
import { TAU } from "../../maths/constants";
import { area } from "../../maths/utils/area";
import { measureArea, measureBoundingBox } from "../../measurements/index";
import { offset } from "./index";

test("offset: offset empty path2", () => {
	const geometry = path2.create();
	const result = offset({ corners: "round" }, geometry) as Geom2;
	expect(() => geom2.validate(result)).never.toThrow();
	expect(measureArea(result)).toBe(0);
	expect(geom2.toPoints(result).size()).toBe(0);
});

test("offset: offset empty path2 closed", () => {
	const geometry = path2.fromPoints({ closed: true }, []);
	const result = offset({}, geometry) as Geom2;
	expect(() => geom2.validate(result)).never.toThrow();
	expect(measureArea(result)).toBe(0);
	expect(geom2.toPoints(result).size()).toBe(0);
});

test("offset: offset single point path2 round", () => {
	const geometry = path2.create([[2, 2]]);
	const result = offset({ delta: 1, corners: "round", segments: 16 }, geometry) as Geom2;
	expect(() => geom2.validate(result)).never.toThrow();
	nearlyEqual(measureArea(result) as number, 3.12, 0.01);
	expect(geom2.toPoints(result).size()).toBe(32);
});

test("offset: offset path2 preserves color", () => {
	const geometry = colorize([1, 0, 0], path2.create());
	const result = offset({}, geometry) as Geom2;
	expect(result.color).toEqual([1, 0, 0, 1]);
});

test("offset: edge-expanding a straight line produces rectangle", () => {
	const points: Vec2[] = [
		[0, 0],
		[0, 10],
	];
	const linePath2 = path2.fromPoints({ closed: false }, points);
	const expandedPathGeom2 = offset({ delta: 2, corners: "edge", segments: 8 }, linePath2) as Geom2;
	const expandedPoints = geom2.toPoints(expandedPathGeom2);

	expect(() => geom2.validate(expandedPathGeom2)).never.toThrow();
	expect(area(expandedPoints)).toBe(40);
	expect(
		comparePoints(measureBoundingBox(expandedPathGeom2) as BoundingBox, [
			[-2, 0, 0],
			[2, 10, 0],
		]),
	).toBe(true);
});

test("offset: edge-expanding a bent line produces expected geometry", () => {
	const points: Vec2[] = [
		[0, 0],
		[0, 10],
		[-5, 10],
	];
	const linePath2 = path2.fromPoints({ closed: false }, points);
	const expandedPathGeom2 = offset({ delta: 2, corners: "edge", segments: 8 }, linePath2) as Geom2;
	const expandedPoints = geom2.toPoints(expandedPathGeom2);

	expect(() => geom2.validate(expandedPathGeom2)).never.toThrow();
	expect(area(expandedPoints)).toBe(60);
	const boundingBox = measureBoundingBox(expandedPathGeom2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[-5, 0, 0],
			[2, 12, 0],
		]),
	).toBe(true);
});

test("offset: edge-expanding a bent line, reversed points, produces expected geometry", () => {
	const points: Vec2[] = [
		[-5, 10],
		[0, 10],
		[0, 0],
	];
	const linePath2 = path2.fromPoints({ closed: false }, points);
	const expandedPathGeom2 = offset({ delta: 2, corners: "edge", segments: 8 }, linePath2) as Geom2;
	const expandedPoints = geom2.toPoints(expandedPathGeom2);

	expect(() => geom2.validate(expandedPathGeom2)).never.toThrow();
	expect(area(expandedPoints)).toBe(60);
	const boundingBox = measureBoundingBox(expandedPathGeom2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[-5, 0, 0],
			[2, 12, 0],
		]),
	).toBe(true);
});

test("offset: round-expanding a bent line produces expected geometry", () => {
	const delta = 2;
	const points: Vec2[] = [
		[0, 0],
		[0, 10],
		[-5, 10],
	];
	const linePath2 = path2.fromPoints({ closed: false }, points);
	const expandedPathGeom2 = offset({ delta, corners: "round", segments: 128 }, linePath2) as Geom2;
	const expandedPoints = geom2.toPoints(expandedPathGeom2);

	expect(() => geom2.validate(expandedPathGeom2)).never.toThrow();
	const expectedArea = 56 + TAU * delta * 1.25; // shape will have 1 and 1/4 circles
	nearlyEqual(area(expandedPoints), expectedArea, 0.01, "Measured area should be pretty close");
	const boundingBox = measureBoundingBox(expandedPathGeom2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[-7, -2, 0],
			[2, 12, 0],
		]),
	).toBe(true);
});

test("offset: chamfer-expanding a bent line produces expected geometry", () => {
	const delta = 2;
	const points: Vec2[] = [
		[0, 0],
		[0, 10],
		[-5, 10],
	];
	const linePath2 = path2.fromPoints({ closed: false }, points);
	const expandedPathGeom2 = offset({ delta, corners: "chamfer", segments: 8 }, linePath2) as Geom2;
	const expandedPoints = geom2.toPoints(expandedPathGeom2);

	expect(() => geom2.validate(expandedPathGeom2)).never.toThrow();
	expect(area(expandedPoints)).toBe(58);
	const boundingBox = measureBoundingBox(expandedPathGeom2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[-5, 0, 0],
			[2, 12, 0],
		]),
	).toBe(true);
});
