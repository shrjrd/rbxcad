import { expect, test } from "@rbxts/jest-globals";

import comparePoints from "../../test/helpers/comparePoints";
import geom2 from "../geometries/geom2";
import { rectangle } from "./index";

test("rectangle (defaults)", () => {
	const geometry = rectangle();
	const obs = geom2.toPoints(geometry);
	const exp: Vec2[] = [
		[-1, -1],
		[1, -1],
		[1, 1],
		[-1, 1],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(4);
	expect(comparePoints(obs, exp)).toBe(true);
});

test("rectangle (options)", () => {
	// test center
	let geometry = rectangle({ center: [-4, -4] });
	let obs = geom2.toPoints(geometry);
	let exp: Vec2[] = [
		[-5, -5],
		[-3, -5],
		[-3, -3],
		[-5, -3],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(4);
	expect(comparePoints(obs, exp)).toBe(true);

	// test size
	geometry = rectangle({ size: [6, 10] });
	obs = geom2.toPoints(geometry);
	exp = [
		[-3, -5],
		[3, -5],
		[3, 5],
		[-3, 5],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(4);
	expect(comparePoints(obs, exp)).toBe(true);
});

test("rectangle (zero size)", () => {
	const geometry = rectangle({ size: [1, 0] });
	const obs = geom2.toPoints(geometry);
	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toBe(0);
});
