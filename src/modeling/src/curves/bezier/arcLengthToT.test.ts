import { expect, test } from "@rbxts/jest-globals";

import { nearlyEqual } from "../../../test/helpers/index";
import { bezier } from "../index";
import arcLengthToT from "./arcLengthToT";
import length from "./length";

test("calculate arcLengthToT for an 1D linear bezier with numeric control points", () => {
	const bezierCurve = bezier.create([0, 10]);
	const len = length(100, bezierCurve);
	nearlyEqual(arcLengthToT({ distance: 0 }, bezierCurve), 0, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len / 2 }, bezierCurve), 0.5, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len }, bezierCurve), 1, 0.0001);
	expect(true).toBe(true);
});

test("calculate arcLengthToT for an 1D linear bezier with array control points", () => {
	const bezierCurve = bezier.create([[0], [10]]);
	const len = length(100, bezierCurve);
	nearlyEqual(arcLengthToT({ distance: 0 }, bezierCurve), 0, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len / 2 }, bezierCurve), 0.5, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len }, bezierCurve), 1, 0.0001);
	expect(true).toBe(true);
});

test("calculate arcLengthToT for a 2D linear bezier", () => {
	const bezierCurve = bezier.create([
		[0, 0],
		[10, 10],
	]);
	const len = length(100, bezierCurve);
	nearlyEqual(arcLengthToT({ distance: 0 }, bezierCurve), 0, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len / 2 }, bezierCurve), 0.5, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len }, bezierCurve), 1, 0.0001);
	expect(true).toBe(true);
});

test("calculate arcLengthToT for a 2D quadratic (3 control points) bezier", () => {
	const bezierCurve = bezier.create([
		[0, 0],
		[0, 10],
		[10, 10],
	]);
	const len = length(100, bezierCurve);
	nearlyEqual(arcLengthToT({ distance: 0 }, bezierCurve), 0, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len / 2 }, bezierCurve), 0.50001, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len }, bezierCurve), 1, 0.0001);
	expect(true).toBe(true);
});

test("calculate arcLengthToT for a 2D cubic (4 control points) bezier", () => {
	const bezierCurve = bezier.create([
		[0, 0],
		[0, 10],
		[10, 10],
		[10, 0],
	]);
	const len = length(100, bezierCurve);
	nearlyEqual(arcLengthToT({ distance: 0 }, bezierCurve), 0, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len / 2 }, bezierCurve), 0.49999, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len }, bezierCurve), 1, 0.0001);
	expect(true).toBe(true);
});

test("calculate arcLengthToT for a 3D linear bezier", () => {
	const bezierCurve = bezier.create([
		[0, 0, 0],
		[10, 10, 10],
	]);
	const len = length(100, bezierCurve);
	nearlyEqual(arcLengthToT({ distance: 0 }, bezierCurve), 0, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len / 2 }, bezierCurve), 0.49999, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len }, bezierCurve), 1, 0.0001);
	expect(true).toBe(true);
});

test("calculate arcLengthToT for a 3D quadratic (3 control points) bezier", () => {
	const bezierCurve = bezier.create([
		[0, 0, 0],
		[5, 5, 5],
		[0, 0, 10],
	]);
	const len = length(100, bezierCurve);
	nearlyEqual(arcLengthToT({ distance: 0 }, bezierCurve), 0, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len / 2 }, bezierCurve), 0.49999, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len }, bezierCurve), 1, 0.0001);
	expect(true).toBe(true);
});

test("calculate arcLengthToT for a 3D cubic (4 control points) bezier", () => {
	const bezierCurve = bezier.create([
		[0, 0, 0],
		[5, 5, 5],
		[0, 0, 10],
		[-5, -5, 5],
	]);
	const len = length(100, bezierCurve);
	nearlyEqual(arcLengthToT({ distance: 0 }, bezierCurve), 0, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len / 2 }, bezierCurve), 0.5621, 0.0001);
	nearlyEqual(arcLengthToT({ distance: len }, bezierCurve), 1, 0.0001);
	expect(true).toBe(true);
});
