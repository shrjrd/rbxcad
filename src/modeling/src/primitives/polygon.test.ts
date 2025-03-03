import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../test/helpers/index";
import { geom2 } from "../geometries/index";
import { measureArea } from "../measurements/index";
import { polygon } from "./index";

test("polygon: providing only object.points creates expected geometry", () => {
	let geometry = polygon({
		points: [
			[0, 0],
			[100, 0],
			[130, 50],
			[30, 50],
		],
	});

	let obs = geom2.toPoints(geometry);
	let exp = [
		[0, 0],
		[100, 0],
		[130, 50],
		[30, 50],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(measureArea(geometry)).toBe(5000);
	expect(comparePoints(obs, exp)).toBe(true);

	geometry = polygon({
		points: [
			[
				[0, 0],
				[100, 0],
				[0, 100],
			],
			[
				[10, 10],
				[80, 10],
				[10, 80],
			],
		],
	});

	obs = geom2.toPoints(geometry);
	exp = [
		[0, 0],
		[100, 0],
		[0, 100],
		[10, 10],
		[80, 10],
		[10, 80],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(measureArea(geometry)).toBe(7450);
	expect(comparePoints(obs, exp)).toBe(true);
});

test("polygon: providing object.points (array) and object.path (array) creates expected geometry", () => {
	let geometry = polygon({
		points: [
			[0, 0],
			[100, 0],
			[130, 50],
			[30, 50],
		],
		paths: [[3, 2, 1, 0]],
	});

	let obs = geom2.toPoints(geometry);
	let exp = [
		[30, 50],
		[130, 50],
		[100, 0],
		[0, 0],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(measureArea(geometry)).toBe(-5000);
	expect(comparePoints(obs, exp)).toBe(true);

	// multiple paths
	geometry = polygon({
		points: [
			[0, 0],
			[100, 0],
			[0, 100],
			[10, 10],
			[80, 10],
			[10, 80],
		],
		paths: [
			[0, 1, 2],
			[3, 4, 5],
		],
	});

	obs = geom2.toPoints(geometry);
	exp = [
		[0, 0],
		[100, 0],
		[0, 100],
		[10, 10],
		[80, 10],
		[10, 80],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(measureArea(geometry)).toBe(7450);
	expect(comparePoints(obs, exp)).toBe(true);

	// multiple points and paths
	geometry = polygon({
		points: [
			[
				[0, 0],
				[100, 0],
				[0, 100],
			],
			[
				[10, 10],
				[80, 10],
				[10, 80],
			],
		],
		paths: [
			[0, 1, 2],
			[3, 4, 5],
		],
	});

	obs = geom2.toPoints(geometry);
	exp = [
		[0, 0],
		[100, 0],
		[0, 100],
		[10, 10],
		[80, 10],
		[10, 80],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(measureArea(geometry)).toBe(7450);
	expect(comparePoints(obs, exp)).toBe(true);
});

test("polygon: clockwise points", () => {
	const poly = polygon({
		points: [
			[-10, -0],
			[-10, -10],
			[-15, -5],
		],
		orientation: "clockwise",
	});
	expect(measureArea(poly)).toBe(25);
});
