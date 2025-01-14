import { expect, test } from "@rbxts/jest-globals";

import comparePoints from "../../test/helpers/comparePoints";
import geom2 from "../geometries/geom2";
import { TAU } from "../maths/constants";
import degToRad from "../utils/degToRad";
import { triangle } from "./index";

test("triangle (defaults)", () => {
	const geometry = triangle();
	const obs = geom2.toPoints(geometry);
	const exp: Vec2[] = [
		[0, 0],
		[1, 0],
		[0.5000000000000002, 0.8660254037844387],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(3);
	expect(comparePoints(obs, exp)).toBe(true);
});

test("triangle (options)", () => {
	// test SSS
	let geometry = triangle({ _type: "SSS", values: [7, 8, 6] });
	let obs = geom2.toPoints(geometry);
	let exp: Vec2[] = [
		[0, 0],
		[7, 0],
		[1.5, 5.809475019311125],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(3);
	expect(comparePoints(obs, exp)).toBe(true);

	// test AAA
	geometry = triangle({ _type: "AAA", values: [TAU / 4, TAU / 8, TAU / 8] });
	obs = geom2.toPoints(geometry);
	exp = [
		[0, 0],
		[1, 0],
		[0, 1.0000000000000002],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(3);
	expect(comparePoints(obs, exp)).toBe(true);

	// test AAS
	geometry = triangle({ _type: "AAS", values: [degToRad(62), degToRad(35), 7] });
	obs = geom2.toPoints(geometry);
	exp = [
		[0, 0],
		[7.86889631692936, 0],
		[2.1348320069064197, 4.015035054457325],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(3);
	expect(comparePoints(obs, exp)).toBe(true);

	// test ASA
	geometry = triangle({ _type: "ASA", values: [degToRad(76), 9, degToRad(34)] });
	obs = geom2.toPoints(geometry);
	exp = [
		[0, 0],
		[9, 0],
		[1.295667368233083, 5.196637976713814],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(3);
	expect(comparePoints(obs, exp)).toBe(true);

	// test SAS
	geometry = triangle({ _type: "SAS", values: [5, degToRad(49), 7] });
	obs = geom2.toPoints(geometry);
	exp = [
		[0, 0],
		[5, 0],
		[0.4075867970664495, 5.282967061559405],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(3);
	expect(comparePoints(obs, exp)).toBe(true);

	// test SSA
	geometry = triangle({ _type: "SSA", values: [8, 13, degToRad(31)] });
	obs = geom2.toPoints(geometry);
	exp = [
		[0, 0],
		[8, 0],
		[8.494946725906148, 12.990574573070846],
	];

	expect(() => geom2.validate(geometry)).never.toThrow();
	expect(obs.size()).toEqual(3);
	expect(comparePoints(obs, exp)).toBe(true);
});
