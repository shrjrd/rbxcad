import { expect, test } from "@rbxts/jest-globals";

import comparePoints from "../../test/helpers/comparePoints";
import geom2 from "../geometries/geom2";
import { square } from "./index";

test("square (defaults)", () => {
	const geometry = square();
	const obs = geom2.toPoints(geometry);
	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(4);
});

test("square (options)", () => {
	// test center
	let obs = square({ size: 7, center: [6.5, 6.5] });
	let pts = geom2.toPoints(obs);
	let exp: Vec2[] = [
		[3, 3],
		[10, 3],
		[10, 10],
		[3, 10],
	];

	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(4);
	expect(comparePoints(pts, exp)).toBe(true);

	// test size
	obs = square({ size: 7 });
	pts = geom2.toPoints(obs);
	exp = [
		[-3.5, -3.5],
		[3.5, -3.5],
		[3.5, 3.5],
		[-3.5, 3.5],
	];

	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(4);
	expect(comparePoints(pts, exp)).toBe(true);
});

test("square (zero size)", () => {
	const geometry = square({ size: 0 });
	const obs = geom2.toPoints(geometry);
	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toBe(0);
});
