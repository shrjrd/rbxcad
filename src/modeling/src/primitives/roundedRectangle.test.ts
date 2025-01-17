import { expect, test } from "@rbxts/jest-globals";

import comparePoints from "../../test/helpers/comparePoints";
import geom2 from "../geometries/geom2";
import { roundedRectangle } from "./index";

test("roundedRectangle (defaults)", () => {
	const geometry = roundedRectangle();
	const obs = geom2.toPoints(geometry);

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(36);
});

test("roundedRectangle (zero size)", () => {
	const obs = roundedRectangle({ size: [1, 0] });
	const pts = geom2.toPoints(obs);
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(0);
});

test("roundedRectangle (zero radius)", () => {
	const obs = roundedRectangle({ roundRadius: 0 });
	const pts = geom2.toPoints(obs);
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toEqual(4);
});

test("roundedRectangle (options)", () => {
	// test center
	let geometry = roundedRectangle({ center: [4, 5], segments: 16 });
	let obs = geom2.toPoints(geometry);
	let exp: Vec2[] = [
		[5, 5.8],
		[4.984775906502257, 5.876536686473018],
		[4.941421356237309, 5.941421356237309],
		[4.876536686473018, 5.984775906502257],
		[4.8, 6],
		[3.2, 6],
		[3.1234633135269823, 5.984775906502257],
		[3.0585786437626905, 5.941421356237309],
		[3.015224093497743, 5.876536686473018],
		[3, 5.8],
		[3, 4.2],
		[3.015224093497743, 4.123463313526982],
		[3.0585786437626905, 4.058578643762691],
		[3.1234633135269823, 4.015224093497743],
		[3.2, 4],
		[4.8, 4],
		[4.876536686473018, 4.015224093497743],
		[4.941421356237309, 4.058578643762691],
		[4.984775906502257, 4.123463313526982],
		[5, 4.2],
	];
	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(20);
	expect(comparePoints(obs, exp)).toBe(true);

	// test size
	geometry = roundedRectangle({ size: [10, 6], segments: 16 });
	obs = geom2.toPoints(geometry);
	exp = [
		[5, 2.8],
		[4.984775906502257, 2.8765366864730177],
		[4.941421356237309, 2.9414213562373095],
		[4.876536686473018, 2.984775906502257],
		[4.8, 3],
		[-4.8, 3],
		[-4.876536686473018, 2.984775906502257],
		[-4.941421356237309, 2.9414213562373095],
		[-4.984775906502257, 2.8765366864730177],
		[-5, 2.8],
		[-5, -2.8],
		[-4.984775906502257, -2.8765366864730177],
		[-4.941421356237309, -2.9414213562373095],
		[-4.876536686473018, -2.984775906502257],
		[-4.8, -3],
		[4.8, -3],
		[4.876536686473018, -2.984775906502257],
		[4.941421356237309, -2.9414213562373095],
		[4.984775906502257, -2.8765366864730177],
		[5, -2.8],
	];
	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(20);
	expect(comparePoints(obs, exp)).toBe(true);

	// test roundRadius
	geometry = roundedRectangle({ size: [10, 6], roundRadius: 2, segments: 16 });
	obs = geom2.toPoints(geometry);
	exp = [
		[5, 1],
		[4.847759065022574, 1.7653668647301797],
		[4.414213562373095, 2.414213562373095],
		[3.7653668647301797, 2.8477590650225735],
		[3, 3],
		[-3, 3],
		[-3.7653668647301792, 2.8477590650225735],
		[-4.414213562373095, 2.414213562373095],
		[-4.847759065022574, 1.7653668647301797],
		[-5, 1.0000000000000002],
		[-5, -0.9999999999999998],
		[-4.847759065022574, -1.7653668647301792],
		[-4.414213562373095, -2.414213562373095],
		[-3.76536686473018, -2.8477590650225735],
		[-3.0000000000000004, -3],
		[2.9999999999999996, -3],
		[3.7653668647301792, -2.8477590650225735],
		[4.414213562373095, -2.414213562373095],
		[4.847759065022574, -1.7653668647301801],
		[5, -1.0000000000000004],
	];
	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(20);
	expect(comparePoints(obs, exp)).toBe(true);

	// test segments
	geometry = roundedRectangle({ size: [10, 6], roundRadius: 2, segments: 64 });
	obs = geom2.toPoints(geometry);
	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(68);
});
