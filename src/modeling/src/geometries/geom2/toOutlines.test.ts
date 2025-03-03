import type { Vec2 } from "../../maths/types";
import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../../test/helpers/index";
import { create, toOutlines } from "./index";

test("geom2: toOutlines() should return no outlines for empty geom2", () => {
	const shp1 = create();
	const exp1: Vec2[] = [];
	const ret1 = toOutlines(shp1) as unknown as Vec2[];
	expect(comparePoints(exp1, ret1)).toBe(true);
});

test("geom2: toOutlines() should return one or more outlines", () => {
	const shp1 = create([
		[
			[-1, -1],
			[1, -1],
			[1, 1],
		],
	]);
	const ret1 = toOutlines(shp1);
	const exp1 = [
		[
			[-1, -1],
			[1, -1],
			[1, 1],
		],
	];
	expect(comparePoints(ret1[0], exp1[0])).toBe(true);

	const shp2 = create([
		[
			[-1, -1],
			[1, -1],
			[1, 1],
		],
		[
			[4, 4],
			[6, 4],
			[6, 6],
		],
	]);
	const ret2 = toOutlines(shp2);
	const exp2 = [
		[
			[-1, -1],
			[1, -1],
			[1, 1],
		],
		[
			[4, 4],
			[6, 4],
			[6, 6],
		],
	];
	expect(comparePoints(ret2[0], exp2[0])).toBe(true);
	expect(comparePoints(ret2[1], exp2[1])).toBe(true);
});

test("geom2: toOutlines() should return outlines for holes in geom2", () => {
	const shp1 = create([
		[
			[10, 10],
			[-10, -10],
			[10, -10],
		],
		[
			[5, -5],
			[6, -4],
			[6, -4],
		],
	]);
	const ret1 = toOutlines(shp1);
	const exp1 = [
		[
			[10, 10],
			[-10, -10],
			[10, -10],
		],
		[
			[5, -5],
			[6, -4],
			[6, -4],
		],
	];
	expect(comparePoints(ret1[0], exp1[0])).toBe(true);
	expect(comparePoints(ret1[1], exp1[1])).toBe(true);

	const shp2 = create([
		[
			[6, -4],
			[5, -5],
			[6, -5],
		],
		[
			[10, 10],
			[-10, -10],
			[10, -10],
		],
		[
			[-6, -8],
			[8, 6],
			[8, -8],
		],
	]);
	const ret2 = toOutlines(shp2);
	const exp2 = [
		[
			[6, -4],
			[5, -5],
			[6, -5],
		],
		[
			[10, 10],
			[-10, -10],
			[10, -10],
		],
		[
			[-6, -8],
			[8, 6],
			[8, -8],
		],
	];
	expect(comparePoints(ret2[0], exp2[0])).toBe(true);
	expect(comparePoints(ret2[1], exp2[1])).toBe(true);
	expect(comparePoints(ret2[2], exp2[2])).toBe(true);
});

test("geom2: toOutlines() should return outlines for edges that touch in geom2", () => {
	const shp1 = create([
		[
			[5, 15],
			[5, 5],
			[15, 5],
			[15, 15],
		],
		[
			[-5, 5],
			[-5, -5],
			[5, -5],
			[5, 5],
		],
	]);
	const ret1 = toOutlines(shp1);
	const exp1 = [
		[
			[5, 15],
			[5, 5],
			[15, 5],
			[15, 15],
		],
		[
			[-5, 5],
			[-5, -5],
			[5, -5],
			[5, 5],
		],
	];
	expect(comparePoints(ret1[0], exp1[0])).toBe(true);
	expect(comparePoints(ret1[1], exp1[1])).toBe(true);
});

test("geom2: toOutlines() should return outlines for holes that touch in geom2", () => {
	const shp1 = create([
		[
			[-20, 20],
			[-20, -20],
			[20, -20],
			[20, 20],
		],
		[
			[5, 5],
			[5, 15],
			[15, 15],
			[15, 5],
		],
		[
			[-5, -5],
			[-5, 5],
			[5, 5],
			[5, -5],
		],
	]);
	const ret1 = toOutlines(shp1);
	const exp1 = [
		[
			[-20, 20],
			[-20, -20],
			[20, -20],
			[20, 20],
		],
		[
			[5, 5],
			[5, 15],
			[15, 15],
			[15, 5],
		],
		[
			[-5, -5],
			[-5, 5],
			[5, 5],
			[5, -5],
		],
	];
	expect(comparePoints(ret1[0], exp1[0])).toBe(true);
	expect(comparePoints(ret1[1], exp1[1])).toBe(true);
	expect(comparePoints(ret1[2], exp1[2])).toBe(true);
});

// touching holes
