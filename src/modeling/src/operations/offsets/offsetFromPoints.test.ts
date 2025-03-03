import type { Vec2 } from "../../maths/types";
import type { BoundingBox } from "../../measurements/types";
import { expect, test } from "@rbxts/jest-globals";
import { Array as JsArray } from "@rbxts/luau-polyfill";

import { comparePoints } from "../../../test/helpers/index";
import { path2 } from "../../geometries/index";
import { measureBoundingBox } from "../../measurements/index";
import { offsetFromPoints } from "./index";

test("offset: offset empty points", () => {
	const offsetPoints = offsetFromPoints({}, []);
	expect(offsetPoints.size()).toBe(0);
});

test("offset: offset single point", () => {
	const offsetPoints = offsetFromPoints({ corners: "round" }, [[2, 2]]);
	expect(offsetPoints.size()).toBe(1);
});

test("offset: offsetting a straight line produces expected geometry", () => {
	const points: Vec2[] = [
		[0, 0],
		[0, 10],
	];

	// offset it by 2.
	let offsetPoints = offsetFromPoints({ delta: 2, corners: "edge", segments: 8 }, points);
	let offsetLinePath2 = path2.create(offsetPoints);
	expect(() => path2.validate(offsetLinePath2)).never.toThrow();
	expect(offsetPoints.size()).toBe(2);
	let boundingBox = measureBoundingBox(offsetLinePath2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[2, 0, 0],
			[2, 10, 0],
		]),
	).toBe(true);

	// offset it by -2.
	offsetPoints = offsetFromPoints({ delta: -2, corners: "edge", segments: 8 }, points);
	offsetLinePath2 = path2.create(offsetPoints);
	expect(() => path2.validate(offsetLinePath2)).never.toThrow();
	expect(offsetPoints.size()).toBe(2);
	boundingBox = measureBoundingBox(offsetLinePath2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[-2, 0, 0],
			[-2, 10, 0],
		]),
	).toBe(true);

	// reverse the points, offset it by 2.
	JsArray.reverse(points); //points.reverse();
	offsetPoints = offsetFromPoints({ delta: 2, corners: "edge", segments: 8 }, points);
	offsetLinePath2 = path2.create(offsetPoints);
	expect(() => path2.validate(offsetLinePath2)).never.toThrow();
	expect(offsetPoints.size()).toBe(2);
	boundingBox = measureBoundingBox(offsetLinePath2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[-2, 0, 0],
			[-2, 10, 0],
		]),
	).toBe(true);
});

test("offset: offsetting a bent line produces expected geometry", () => {
	const points: Vec2[] = [
		[0, 0],
		[0, 5],
		[0, 10],
		[5, 10],
		[10, 10],
	];

	// offset it by 2.
	let offsetPoints = offsetFromPoints({ delta: 2, corners: "edge", segments: 8 }, points);
	let offsetLinePath2 = path2.create(offsetPoints);
	expect(() => path2.validate(offsetLinePath2)).never.toThrow();
	expect(offsetPoints.size()).toBe(5);
	let boundingBox = measureBoundingBox(offsetLinePath2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[2, 0, 0],
			[10, 8, 0],
		]),
	).toBe(true);

	// offset it by -2.
	offsetPoints = offsetFromPoints({ delta: -2, corners: "edge", segments: 8 }, points);
	offsetLinePath2 = path2.create(offsetPoints);
	expect(() => path2.validate(offsetLinePath2)).never.toThrow();
	expect(offsetPoints.size()).toBe(5);
	boundingBox = measureBoundingBox(offsetLinePath2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[-2, 0, 0],
			[10, 12, 0],
		]),
	).toBe(true);
});

test("offset: offsetting a 2 segment straight line produces expected geometry", () => {
	const points: Vec2[] = [
		[0, 0],
		[0, 5],
		[0, 10],
	];
	const offsetPoints = offsetFromPoints({ delta: 2, corners: "edge", segments: 8 }, points);
	const offsetLinePath2 = path2.create(offsetPoints);
	expect(() => path2.validate(offsetLinePath2)).never.toThrow();
	expect(offsetPoints.size()).toBe(3);
	const boundingBox = measureBoundingBox(offsetLinePath2) as BoundingBox;
	expect(
		comparePoints(boundingBox, [
			[2, 0, 0],
			[2, 10, 0],
		]),
	).toBe(true);
});

test("offset (corners: chamfer): offset of a path2 produces expected offset path2", () => {
	const openline: Vec2[] = [
		[0, 0],
		[5, 0],
		[0, 5],
	];
	const closeline: Vec2[] = [
		[0, 0],
		[5, 0],
		[0, 5],
		[0, 0],
	];

	// empty points
	let pts = offsetFromPoints({ delta: 1 }, []);
	let obs = path2.create(pts);
	let exp: number[][] = [];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	// expand +
	pts = offsetFromPoints({ delta: 1, corners: "chamfer" }, openline);
	obs = path2.create(pts);
	exp = [
		[-6.123233995736766e-17, -1],
		[5, -1],
		[5.707106781186548, 0.7071067811865475],
		[0.7071067811865475, 5.707106781186548],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	pts = offsetFromPoints({ delta: 1, corners: "chamfer" }, closeline);
	obs = path2.create(pts);
	exp = [
		[-6.123233995736766e-17, -1],
		[5, -1],
		[5.707106781186548, 0.7071067811865475],
		[0.7071067811865475, 5.707106781186548],
		[-1, 5],
		[-1, 6.123233995736766e-17],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	// contract -
	pts = offsetFromPoints({ delta: -1, corners: "chamfer" }, openline);
	obs = path2.create(pts);
	exp = [
		[6.123233995736766e-17, 1],
		[2.5857864376269046, 1],
		[-0.7071067811865475, 4.292893218813452],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	pts = offsetFromPoints({ delta: -1, corners: "chamfer", closed: true }, openline);
	obs = path2.create(pts);
	exp = [
		[1, 1],
		[2.5857864376269046, 1],
		[0.9999999999999996, 2.585786437626905],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);
});

test("offset (corners: edge): offset of a path2 produces expected offset path2", () => {
	const openline: Vec2[] = [
		[-5, -5],
		[5, -5],
		[5, 5],
		[3, 5],
		[3, 0],
		[-3, 0],
		[-3, 5],
		[-5, 5],
	];

	let pts = offsetFromPoints({ delta: 1, corners: "edge" }, openline);
	let obs = path2.create(pts);
	let exp = [
		[-5, -6],
		[6, -6],
		[6, 6],
		[2, 6],
		[2, 1],
		[-2, 1],
		[-1.9999999999999996, 6],
		[-5, 6],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	pts = offsetFromPoints({ delta: 1, corners: "edge", closed: true }, openline);
	obs = path2.create(pts);
	exp = [
		[6, -6],
		[6, 6],
		[2, 6],
		[2, 1],
		[-2, 1],
		[-1.9999999999999996, 6],
		[-6, 6],
		[-6, -6],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	pts = offsetFromPoints({ delta: -0.5, corners: "edge" }, openline);
	obs = path2.create(pts);
	exp = [
		[-5, -4.5],
		[4.5, -4.5],
		[4.5, 4.5],
		[3.5, 4.5],
		[3.4999999999999996, -0.5],
		[-3.5, -0.4999999999999996],
		[-3.5, 4.5],
		[-5, 4.5],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	pts = offsetFromPoints({ delta: -0.5, corners: "edge", closed: true }, openline);
	obs = path2.create(pts);
	exp = [
		[-4.5, -4.5],
		[4.5, -4.5],
		[4.5, 4.5],
		[3.5, 4.5],
		[3.4999999999999996, -0.5],
		[-3.5, -0.4999999999999996],
		[-3.5, 4.5],
		[-4.5, 4.5],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);
});

test("offset (corners: round): offset of a path2 produces expected offset path2", () => {
	const openline: Vec2[] = [
		[-5, -5],
		[5, -5],
		[5, 5],
		[3, 5],
		[3, 0],
		[-3, 0],
		[-3, 5],
		[-5, 5],
	];

	let pts = offsetFromPoints({ delta: 1, corners: "round", segments: 16 }, openline);
	let obs = path2.create(pts);
	let exp = [
		[-5, -6],
		[5, -6],
		[5.38268343236509, -5.923879532511287],
		[5.707106781186548, -5.707106781186548],
		[5.923879532511287, -5.38268343236509],
		[6, -5],
		[6, 5],
		[5.923879532511287, 5.38268343236509],
		[5.707106781186548, 5.707106781186548],
		[5.38268343236509, 5.923879532511287],
		[5, 6],
		[3, 6],
		[2.6173165676349104, 5.923879532511287],
		[2.2928932188134525, 5.707106781186548],
		[2.076120467488713, 5.38268343236509],
		[2, 5],
		[2, 1],
		[-2, 1],
		[-2, 5],
		[-2.076120467488713, 5.38268343236509],
		[-2.2928932188134525, 5.707106781186548],
		[-2.6173165676349104, 5.923879532511287],
		[-3, 6],
		[-5, 6],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);

	pts = offsetFromPoints({ delta: 1, corners: "round", segments: 16, closed: true }, openline);
	obs = path2.create(pts);
	exp = [
		[-5.923879532511287, -5.38268343236509],
		[-5.707106781186548, -5.707106781186548],
		[-5.3826834323650905, -5.923879532511286],
		[-5, -6],
		[5, -6],
		[5.38268343236509, -5.923879532511287],
		[5.707106781186548, -5.707106781186548],
		[5.923879532511287, -5.38268343236509],
		[6, -5],
		[6, 5],
		[5.923879532511287, 5.38268343236509],
		[5.707106781186548, 5.707106781186548],
		[5.38268343236509, 5.923879532511287],
		[5, 6],
		[3, 6],
		[2.6173165676349104, 5.923879532511287],
		[2.2928932188134525, 5.707106781186548],
		[2.076120467488713, 5.38268343236509],
		[2, 5],
		[2, 1],
		[-2, 1],
		[-2, 5],
		[-2.076120467488713, 5.38268343236509],
		[-2.2928932188134525, 5.707106781186548],
		[-2.6173165676349104, 5.923879532511287],
		[-3, 6],
		[-5, 6],
		[-5.38268343236509, 5.923879532511287],
		[-5.707106781186548, 5.707106781186548],
		[-5.923879532511287, 5.38268343236509],
		[-6, 5],
		[-6, -5],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);
});

test("offset (corners: round): offset of a CW path2 produces expected offset path2", () => {
	const closeline: Vec2[] = [
		[5, -5],
		[5, 5],
		[3, 5],
		[3, 0],
		[-3, 0],
		[-3, 5],
		[-5, 5],
		[-5, -5],
		//].reverse();
	];
	JsArray.reverse(closeline);

	const pts = offsetFromPoints({ delta: 1, corners: "round", segments: 16, closed: true }, closeline);
	const obs = path2.create(pts);
	const exp = [
		[-5.38268343236509, -5.923879532511287],
		[-5.707106781186548, -5.707106781186548],
		[-5.923879532511287, -5.38268343236509],
		[-6, -5],
		[-6, 5],
		[-5.923879532511287, 5.38268343236509],
		[-5.707106781186548, 5.707106781186548],
		[-5.38268343236509, 5.923879532511287],
		[-5, 6],
		[-3, 6],
		[-2.6173165676349104, 5.923879532511287],
		[-2.2928932188134525, 5.707106781186548],
		[-2.076120467488713, 5.38268343236509],
		[-2, 5],
		[-2, 1],
		[2, 1],
		[2, 5],
		[2.076120467488713, 5.38268343236509],
		[2.2928932188134525, 5.707106781186548],
		[2.6173165676349104, 5.923879532511287],
		[3, 6],
		[5, 6],
		[5.38268343236509, 5.923879532511287],
		[5.707106781186548, 5.707106781186548],
		[5.923879532511287, 5.38268343236509],
		[6, 5],
		[6, -5],
		[5.923879532511287, -5.38268343236509],
		[5.707106781186548, -5.707106781186548],
		[5.38268343236509, -5.923879532511287],
		[5, -6],
		[-5, -6],
	];
	expect(() => path2.validate(obs)).never.toThrow();
	expect(comparePoints(pts, exp)).toBe(true);
});
