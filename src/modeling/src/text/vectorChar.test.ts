import type { Path2 } from "../geometries/types";
import type { Vec2 } from "../maths/types";
import { expect, test } from "@rbxts/jest-globals";

import { vec2 } from "../maths/index";
import { vectorChar } from "./index";

const compareSegments = (paths: Path2[], segments: Vec2[][]) => {
	if (paths.size() !== segments.size()) return false;
	for (let i = 0; i < paths.size(); i++) {
		const ppoints = paths[i].points;
		const spoints = segments[i];
		if (ppoints.size() !== spoints.size()) return false;
		for (let i = 0; i < ppoints.size(); i++) {
			if (!vec2.equals(ppoints[i], spoints[i])) return false;
		}
	}
	return true;
};

test("vectorChar (char)", () => {
	const obs = vectorChar({}, "H");
	const expSegments: Vec2[][] = [
		[
			[4, 21],
			[4, 0],
		],
		[
			[18, 21],
			[18, 0],
		],
		[
			[4, 11],
			[18, 11],
		],
	];

	expect(obs.width).toEqual(22);
	expect(obs.height).toEqual(14);
	expect(compareSegments(obs.paths, expSegments)).toBe(true);
});

test("vectorChar ({ xOffset, yOffset }, char)", () => {
	const obs = vectorChar({ xOffset: 10, yOffset: 20 }, "H");
	const expSegments: Vec2[][] = [
		[
			[14, 41],
			[14, 20],
		],
		[
			[28, 41],
			[28, 20],
		],
		[
			[14, 31],
			[28, 31],
		],
	];

	expect(obs.width).toEqual(22);
	expect(obs.height).toEqual(14);
	expect(compareSegments(obs.paths, expSegments)).toBe(true);
});

test("vectorChar ({ height }, char)", () => {
	const obs = vectorChar({ height: 10 }, "h");
	const expSegments: Vec2[][] = [
		[
			[2.857142857142857, 15],
			[2.857142857142857, 0],
		],
		[
			[2.857142857142857, 7.142857142857143],
			[5, 9.285714285714286],
			[6.428571428571429, 10],
			[8.571428571428571, 10],
			[10, 9.285714285714286],
			[10.714285714285715, 7.142857142857143],
			[10.714285714285715, 0],
		],
	];

	expect(obs.width).toEqual(13.571428571428571);
	expect(obs.height).toEqual(10);
	expect(compareSegments(obs.paths, expSegments)).toBe(true);
});

test("vectorChar required options", () => {
	expect(() => vectorChar()).toThrowError({ message: "text must be a single character" });
	expect(() => vectorChar({})).toThrowError({ message: "text must be a single character" });
	expect(() => vectorChar({}, "")).toThrowError({ message: "text must be a single character" });
	expect(() => vectorChar({}, "ABC")).toThrowError({ message: "text must be a single character" });
});
