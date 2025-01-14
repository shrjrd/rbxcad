import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../../test/helpers";
import { geom2 } from "../../geometries";
import { circle, rectangle } from "../../primitives";
import { center } from "../transforms/center";
import { intersect } from "./index";

test("intersect: intersect of one or more geom2 objects produces expected geometry", () => {
	const geometry1 = circle({ radius: 2, segments: 8 });

	// intersect of one object
	const result1 = intersect(geometry1) as Geom2;
	let obs = geom2.toPoints(result1);
	let exp: Vec2[] = [
		[2, 0],
		[1.4142000000000001, 1.4142000000000001],
		[0, 2],
		[-1.4142000000000001, 1.4142000000000001],
		[-2, 0],
		[-1.4142000000000001, -1.4142000000000001],
		[0, -2],
		[1.4142000000000001, -1.4142000000000001],
	];
	expect(() => geom2.validate(result1)).never.toThrow();
	expect(obs.size()).toBe(8);
	expect(comparePoints(obs, exp)).toBe(true);

	// intersect of two non-overlapping objects
	const geometry2 = center({ relativeTo: [10, 10, 0] }, rectangle({ size: [4, 4] })) as Geom2;

	const result2 = intersect(geometry1, geometry2) as Geom2;
	obs = geom2.toPoints(result2);
	expect(() => geom2.validate(result2)).never.toThrow();
	expect(obs.size()).toBe(0);

	// intersect of two partially overlapping objects
	const geometry3 = rectangle({ size: [18, 18] });

	const result3 = intersect(geometry2, geometry3) as Geom2;
	obs = geom2.toPoints(result3);
	exp = [
		[9, 9],
		[8, 9],
		[8, 8],
		[9, 8],
	];
	expect(() => geom2.validate(result3)).never.toThrow();
	expect(obs.size()).toBe(4);
	expect(comparePoints(obs, exp)).toBe(true);

	// intersect of two completely overlapping objects
	const result4 = intersect(geometry1, geometry3) as Geom2;
	obs = geom2.toPoints(result4);
	exp = [
		[2, 0],
		[1.4142000000000001, 1.4142000000000001],
		[0, 2],
		[-1.4142000000000001, 1.4142000000000001],
		[-2, 0],
		[-1.4142000000000001, -1.4142000000000001],
		[0, -2],
		[1.4142000000000001, -1.4142000000000001],
	];
	expect(() => geom2.validate(result4)).never.toThrow();
	expect(obs.size()).toBe(8);
	expect(comparePoints(obs, exp)).toBe(true);
});
