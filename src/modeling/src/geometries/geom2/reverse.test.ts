import type { Vec2 } from "../../maths/types";
import type { Geom2 } from "../types";
import { expect, test } from "@rbxts/jest-globals";

import { comparePoints, compareVectors } from "../../../test/helpers/index";
import { colorize } from "../../colors/index";
import { create, reverse, toPoints } from "./index";

test("reverse: reverses a populated geom2", () => {
	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const expected = {
		outlines: [
			[
				[0, 1],
				[1, 0],
				[0, 0],
			],
		],
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	const geometry = create([points]);
	const another = reverse(geometry);
	expect(geometry).never.toBe(another);
	expect(comparePoints(another.outlines[0], expected.outlines[0])).toBe(true);
	expect(compareVectors(another.transforms, expected.transforms)).toBe(true);
});

test("reverse: does not modify input geometry", () => {
	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	// expected:
	const forward = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const backward = [
		[0, 1],
		[1, 0],
		[0, 0],
	];

	const geometry = create([points]);
	const another = reverse(geometry);
	expect(geometry).never.toBe(another);
	expect(comparePoints(toPoints(geometry), forward)).toBe(true);
	expect(comparePoints(toPoints(another), backward)).toBe(true);
});

test("reverse: preserves color", () => {
	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const geometry = colorize([1, 0, 0], create([points])) as Geom2;
	const reversed = reverse(geometry);
	expect(reversed.color).toEqual([1, 0, 0, 1]);
});
