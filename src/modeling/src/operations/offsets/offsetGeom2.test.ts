import type { Geom2 } from "../../geometries/types";
import type { Corners } from "../../utils/corners";
import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../../test/helpers/index";
import { colorize } from "../../colors/index";
import { geom2 } from "../../geometries/index";
import { measureArea } from "../../measurements/index";
import { roundedRectangle, square } from "../../primitives/index";
import { offset } from "./index";

test("offset: offset an empty geom2", () => {
	const empty = geom2.create();
	const result = offset({ delta: 1 }, empty) as Geom2;
	expect(() => geom2.validate(result)).never.toThrow();
	expect(measureArea(result)).toBe(0);
	expect(geom2.toPoints(result).size()).toBe(0);
});

test("offset: offset option validation", () => {
	const empty = geom2.create();
	// DEVIATION: use "" instead of undefined
	expect(() => offset({ delta: "" as unknown as number }, empty)).toThrowError({
		message: "delta must be a finite number",
	});
	expect(() => offset({ delta: "" as unknown as number }, empty)).toThrowError({
		message: "delta must be a finite number",
	});
	expect(() => offset({ delta: math.huge }, empty)).toThrowError({ message: "delta must be a finite number" });
	expect(() => offset({ delta: 0 / 0 }, empty)).toThrowError({ message: "delta must be a finite number" });
	expect(() => offset({ corners: "round", segments: "" as unknown as number }, empty)).toThrowError({
		message: "segments must be a finite number",
	});
	expect(() => offset({ corners: "round", segments: "" as unknown as number }, empty)).toThrowError({
		message: "segments must be a finite number",
	});
	expect(() => offset({ corners: "round", segments: math.huge }, empty)).toThrowError({
		message: "segments must be a finite number",
	});
	expect(() => offset({ corners: "round", segments: 0 / 0 }, empty)).toThrowError({
		message: "segments must be a finite number",
	});
	expect(() => offset({ corners: "round", segments: 0 }, empty)).toThrowError({
		message: "segments must be greater than zero",
	});
	expect(() => offset({ corners: "round", segments: -1 }, empty)).toThrowError({
		message: "segments must be greater than zero",
	});
	expect(() => offset({ corners: "" as unknown as Corners }, empty)).toThrowError({
		message: 'corners must be "edge", "chamfer", or "round"',
	});
	expect(() => offset({ corners: "" as unknown as Corners }, empty)).toThrowError({
		message: 'corners must be "edge", "chamfer", or "round"',
	});
	expect(() => offset({ corners: 4 as unknown as Corners }, empty)).toThrowError({
		message: 'corners must be "edge", "chamfer", or "round"',
	});
	expect(() => offset({ corners: "fluffy" as Corners }, empty)).toThrowError({
		message: 'corners must be "edge", "chamfer", or "round"',
	});
});

test("offset: offset geom2 preserves color", () => {
	const geometry = colorize([1, 0, 0], square({}));
	const result = offset({}, geometry) as Geom2;
	expect(result.color).toEqual([1, 0, 0, 1]);
});

test("offset: offset of a geom2 produces expected changes to points", () => {
	const geometry = square({ size: 16 });

	const obs = offset({ delta: 2, corners: "round", segments: 8 }, geometry) as Geom2;
	const pts = geom2.toPoints(obs);
	const exp = [
		[-9.414213562373096, -9.414213562373096],
		[-8, -10],
		[8, -10],
		[9.414213562373096, -9.414213562373096],
		[10, -8],
		[10, 8],
		[9.414213562373096, 9.414213562373096],
		[8, 10],
		[-8, 10],
		[-9.414213562373096, 9.414213562373096],
		[-10, 8],
		[-10, -8],
	];
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(395.3137084989848);
	expect(pts.size()).toBe(12);
	expect(comparePoints(pts, exp)).toBe(true);
});

test("offset (options): offsetting of a simple geom2 produces expected offset geom2", () => {
	const geometry = geom2.create([
		[
			[-5, -5],
			[5, -5],
			[5, 5],
			[3, 5],
			[3, 0],
			[-3, 0],
			[-3, 5],
			[-5, 5],
		],
	]);

	// expand +
	let obs = offset({ delta: 1, corners: "round", segments: 4 }, geometry) as Geom2;
	let pts = geom2.toPoints(obs);
	let exp = [
		[-5, -6],
		[5, -6],
		[6, -5],
		[6, 5],
		[5, 6],
		[3, 6],
		[2, 5],
		[2, 1],
		[-2, 1],
		[-2, 5],
		[-3, 6],
		[-5, 6],
		[-6, 5],
		[-6, -5],
	];
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(121);
	expect(pts.size()).toBe(14);
	expect(comparePoints(pts, exp)).toBe(true);

	// contract -
	obs = offset({ delta: -0.5, corners: "round", segments: 4 }, geometry) as Geom2;
	pts = geom2.toPoints(obs);
	exp = [
		[-4.5, -4.5],
		[4.5, -4.5],
		[4.5, 4.5],
		[3.5, 4.5],
		[3.5, -3.0616171314629196e-17],
		[3, -0.5],
		[-3, -0.5],
		[-3.5, 3.0616171314629196e-17],
		[-3.5, 4.5],
		[-4.5, 4.5],
	];
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(46.25);
	expect(pts.size()).toBe(10);
	expect(comparePoints(pts, exp)).toBe(true);

	// segments 1 - sharp points at corner
	obs = offset({ delta: 1, corners: "edge" }, geometry) as Geom2;
	pts = geom2.toPoints(obs);
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
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(124);
	expect(pts.size()).toBe(8);
	expect(comparePoints(pts, exp)).toBe(true);

	// segments 16 - rounded corners
	obs = offset({ delta: -0.5, corners: "round", segments: 16 }, geometry) as Geom2;
	pts = geom2.toPoints(obs);
	exp = [
		[-4.5, -4.5],
		[4.5, -4.5],
		[4.5, 4.5],
		[3.5, 4.5],
		[3.5, -3.061616997868383e-17],
		[3.4619397662556435, -0.19134171618254492],
		[3.353553390593274, -0.3535533905932738],
		[3.191341716182545, -0.46193976625564337],
		[3, -0.5],
		[-3, -0.5],
		[-3.191341716182545, -0.46193976625564337],
		[-3.353553390593274, -0.3535533905932738],
		[-3.4619397662556435, -0.19134171618254495],
		[-3.5, 3.061616997868383e-17],
		[-3.5, 4.5],
		[-4.5, 4.5],
	];
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(46.1173165676349);
	expect(pts.size()).toBe(16);
	expect(comparePoints(pts, exp)).toBe(true);
});

test("offset (options): offsetting of a complex geom2 produces expected offset geom2", () => {
	const geometry = geom2.create([
		[
			[-75, -75],
			[75, -75],
			[75, 75],
			[40, 75],
			[40, 0],
			[-40, 0],
			[-40, 75],
			[-75, 75],
		],
		[
			[15, -40],
			[8, -40],
			[8, -25],
			[-8, -25],
			[-8, -40],
			[-15, -40],
			[-15, -10],
			[15, -10],
		],
		[
			[-2, -19],
			[2, -19],
			[2, -15],
			[-2, -15],
		],
	]);

	// expand +
	const obs = offset({ delta: 2, corners: "edge", expandHoles: true }, geometry) as Geom2;
	const pts = geom2.toPoints(obs);
	const exp = [
		[77, -77],
		[77, 77],
		[38, 77],
		[38, 2],
		[-38, 2],
		[-37.99999999999999, 77],
		[-77, 77],
		[-77, -77],
		[13, -38],
		[10, -38],
		[10, -23],
		[-10, -23],
		[-10, -38],
		[-13, -38],
		[-13, -12],
		[13, -12],
		[3.9999999999999996, -21],
		[4, -13],
		[-4, -13],
		[-4, -21],
	];
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(17704);
	expect(pts.size()).toBe(20);
	expect(comparePoints(pts, exp)).toBe(true);
});

test("offset (options): offsetting of round geom2 produces expected offset geom2", () => {
	const geometry = geom2.create([
		[
			[10.0, 0.0],
			[9.2388, 3.82683],
			[7.07107, 7.07107],
			[3.82683, 9.2388],
			[0.0, 10.0],
			[-3.82683, 9.2388],
			[-7.07107, 7.07107],
			[-9.2388, 3.82683],
			[-10.0, 0.0],
			[-9.2388, -3.82683],
			[-7.07107, -7.07107],
			[-3.82683, -9.2388],
			[-0.0, -10.0],
			[3.82683, -9.2388],
			[7.07107, -7.07107],
			[9.2388, -3.82683],
		],
	]);

	const obs = offset({ delta: -0.5, corners: "round" }, geometry) as Geom2;
	const pts = geom2.toPoints(obs);
	const exp = [
		[9.490204518135641, 0],
		[8.767810140100096, 3.6317399864658007],
		[6.710590060510285, 6.7105900605102855],
		[3.6317399864658024, 8.767810140100096],
		[-4.440892098500626e-16, 9.490204518135641],
		[-3.6317399864658007, 8.767810140100096],
		[-6.7105900605102855, 6.710590060510285],
		[-8.767810140100096, 3.6317399864658024],
		[-9.490204518135641, -4.440892098500626e-16],
		[-8.767810140100096, -3.6317399864658007],
		[-6.710590060510285, -6.7105900605102855],
		[-3.6317399864658024, -8.767810140100096],
		[4.440892098500626e-16, -9.490204518135641],
		[3.6317399864658007, -8.767810140100096],
		[6.7105900605102855, -6.710590060510285],
		[8.767810140100096, -3.6317399864658024],
	];
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(275.72806620525375);
	expect(pts.size()).toBe(16);
	expect(comparePoints(pts, exp)).toBe(true);
});

test("offset (options): offsetting issue #1017", () => {
	const geometry = roundedRectangle({ size: [10, 10], segments: 4 });
	const obs = offset({ delta: -2, corners: "round" }, geometry) as Geom2;
	//t.notThrows.skip(() => geom2.validate(obs));
	//expect(() => geom2.validate(obs)).never.toThrow();
});
