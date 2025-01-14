import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../../test/helpers";
import { geom2 } from "../../geometries";
import { circle, rectangle } from "../../primitives";
import { center } from "../transforms/center";
import { subtract } from "./index";

test("subtract: subtract of one or more geom2 objects produces expected geometry", () => {
	const geometry1 = circle({ radius: 2, segments: 8 });

	// subtract of one object
	const result1 = subtract(geometry1) as Geom2;
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

	// subtract of two non-overlapping objects
	const geometry2 = center({ relativeTo: [10, 10, 0] }, rectangle({ size: [4, 4] })) as Geom3;

	const result2 = subtract(geometry1, geometry2) as Geom2;
	obs = geom2.toPoints(result2);
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
	expect(() => geom2.validate(result2)).never.toThrow();
	expect(obs.size()).toBe(8);
	expect(comparePoints(obs, exp)).toBe(true);

	// subtract of two partially overlapping objects
	const geometry3 = rectangle({ size: [18, 18] });

	const result3 = subtract(geometry2, geometry3) as Geom2;
	obs = geom2.toPoints(result3);
	exp = [
		[12, 12],
		[9, 9],
		[8, 9],
		[8, 12],
		[9, 8],
		[12, 8],
	];
	expect(() => geom2.validate(result3)).never.toThrow();
	expect(obs.size()).toBe(6);
	expect(comparePoints(obs, exp)).toBe(true);

	// subtract of two completely overlapping objects
	const result4 = subtract(geometry1, geometry3) as Geom2;
	obs = geom2.toPoints(result4);
	exp = [];
	expect(() => geom2.validate(result4)).never.toThrow();
	expect(obs.size()).toBe(0);
	expect(obs).toEqual(exp);
});
