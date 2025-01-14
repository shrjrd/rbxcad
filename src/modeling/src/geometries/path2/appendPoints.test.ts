import { expect, test } from "@rbxts/jest-globals";

import { appendPoints, fromPoints, toPoints } from "./index";

test("appendPoints: appending to an empty path produces a new path with expected points", () => {
	const p1 = fromPoints({}, []);
	const obs = appendPoints([[1, 1]], p1);
	const pts = toPoints(obs);
	expect(p1).never.toBe(obs);
	expect(pts.size()).toBe(1);
});

test("appendPoints: appending to a path produces a new path with expected points", () => {
	const p1 = fromPoints({}, [
		[1, 1],
		[2, 2],
	]);
	const obs = appendPoints(
		[
			[3, 3],
			[4, 4],
		],
		p1,
	);
	const pts = toPoints(obs);
	expect(p1).never.toBe(obs);
	expect(pts.size()).toBe(4);
});

test("appendPoints: appending empty points to a path produces a new path with expected points", () => {
	const p1 = fromPoints({}, [
		[1, 1],
		[2, 2],
	]);
	const obs = appendPoints([], p1);
	const pts = toPoints(obs);
	expect(p1).never.toBe(obs);
	expect(pts.size()).toBe(2);
});

test("appendPoints: appending same points to a path produces a new path with expected points", () => {
	const p1 = fromPoints({}, [
		[1, 1],
		[2, 2],
	]);
	const obs = appendPoints(
		[
			[2, 2],
			[3, 3],
		],
		p1,
	);
	const pts = toPoints(obs);
	expect(p1).never.toBe(obs);
	expect(pts.size()).toBe(3);
});
