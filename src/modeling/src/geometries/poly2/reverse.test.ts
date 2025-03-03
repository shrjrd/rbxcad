import type { Vec2 } from "../../maths/types";
import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../../test/helpers/index";
import { create, reverse, toPoints } from "./index";

test("reverse: reverses a populated poly2", () => {
	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const expected = {
		points: [
			[0, 1],
			[1, 0],
			[0, 0],
		],
	};
	const geometry = create(points);
	const another = reverse(geometry);
	expect(geometry).never.toBe(another);
	expect(comparePoints(another.points, expected.points)).toBe(true);
});

test("reverse: does not modify input poly2", () => {
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

	const geometry = create(points);
	const another = reverse(geometry);
	expect(geometry).never.toBe(another);
	expect(comparePoints(toPoints(geometry), forward)).toBe(true);
	expect(comparePoints(toPoints(another), backward)).toBe(true);
});
