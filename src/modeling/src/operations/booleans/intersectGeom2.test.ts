import type { Geom2 } from "../../geometries/types";
import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../../test/helpers/index";
import { geom2 } from "../../geometries/index";
import { measureArea } from "../../measurements/index";
import { circle, rectangle, square } from "../../primitives/index";
import { center } from "../transforms/index";
import { intersect } from "./index";

test("intersect: intersect of one or more geom2 objects produces expected geometry", () => {
	const geometry1 = circle({ radius: 2, segments: 8 });

	// intersect of one object
	const result1 = intersect(geometry1) as Geom2;
	let obs = geom2.toPoints(result1);
	let exp = [
		[2, 0],
		[1.4142135623730951, 1.414213562373095],
		[0, 2],
		[-1.414213562373095, 1.4142135623730951],
		[-2, 0],
		[-1.4142135623730954, -1.414213562373095],
		[0, -2],
		[1.4142135623730947, -1.4142135623730954],
	];
	expect(() => geom2.validate(result1)).never.toThrow();
	// DEVIATION: floating point differs?
	//expect(measureArea(result1)).toBe(11.31370849898476);
	expect(measureArea(result1)).toBe(11.313708498984761);
	expect(obs.size()).toBe(8);
	expect(comparePoints(obs, exp)).toBe(true);

	// intersect of two non-overlapping objects
	const geometry2 = center({ relativeTo: [10, 10, 0] }, rectangle({ size: [4, 4] }));

	const result2 = intersect(geometry1, geometry2) as Geom2;
	obs = geom2.toPoints(result2);
	expect(() => geom2.validate(result2)).never.toThrow();
	expect(measureArea(result2)).toBe(0);
	expect(obs.size()).toBe(0);

	// intersect of two partially overlapping objects
	const geometry3 = rectangle({ size: [18, 18] });

	const result3 = intersect(geometry2, geometry3) as Geom2;
	obs = geom2.toPoints(result3);
	exp = [
		[8, 8],
		[9, 8],
		[9, 9],
		[8, 9],
	];
	expect(() => geom2.validate(result3)).never.toThrow();
	expect(measureArea(result3)).toBe(1);
	expect(obs.size()).toBe(4);
	expect(comparePoints(obs, exp)).toBe(true);

	// intersect of two completely overlapping objects
	const result4 = intersect(geometry1, geometry3) as Geom2;
	obs = geom2.toPoints(result4);
	exp = [
		[-2, 0],
		[-1.4142135623730954, -1.414213562373095],
		[0, -2],
		[1.4142135623730947, -1.4142135623730954],
		[2, 0],
		[1.4142135623730951, 1.414213562373095],
		[0, 2],
		[-1.414213562373095, 1.4142135623730951],
	];
	expect(() => geom2.validate(result4)).never.toThrow();
	expect(measureArea(result4)).toBe(11.31370849898476);
	expect(obs.size()).toBe(8);
	expect(comparePoints(obs, exp)).toBe(true);
});

test("intersect with undefined/null values", () => {
	const square1 = square({ size: 8 });
	const square2 = square({ size: 6 });
	const square3 = square({ size: 4 });
	const geometries = [square1, undefined, square2, undefined, square3] as Geom2[];

	const obs = intersect(...geometries) as Geom2;
	const pts = geom2.toPoints(obs);
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(4);
});

test("intersect of nested arrays", () => {
	const square1 = square({ size: 8 });
	const square2 = square({ size: 6 });
	const square3 = square({ size: 4 });
	const geometries = [square1, [square2, [square3]]];

	const obs = intersect(...geometries) as Geom2;
	const pts = geom2.toPoints(obs);
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(4);
});
