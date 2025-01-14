import { expect, test } from "@rbxts/jest-globals";

import { create, fromCompactBinary, fromPoints, toCompactBinary } from "./index";

test("toCompactBinary: converts path2 into a compact form", () => {
	const geometry1 = create();
	const compacted1 = toCompactBinary(geometry1);
	const expected1 = [
		2, // type
		1,
		0,
		0,
		0, // transforms
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0, // isClosed
		-1,
		-1,
		-1,
		-1, // color
	];

	expect(compacted1).toEqual(expected1);

	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const geometry2 = fromPoints({ closed: true }, points);
	const compacted2 = toCompactBinary(geometry2);
	const expected2 = [
		2, // type
		1,
		0,
		0,
		0, // transforms
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		1, // closed/open flag
		-1,
		-1,
		-1,
		-1, // color
		0,
		0, // points
		1,
		0,
		0,
		1,
	];

	expect(compacted2).toEqual(expected2);

	// test color as well
	geometry2.color = [1, 2, 3, 4];
	const compacted3 = toCompactBinary(geometry2);
	const expected3 = [
		2, // type
		1,
		0,
		0,
		0, // transforms
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		1, // closed/open flag
		1,
		2,
		3,
		4, // color
		0,
		0, // points
		1,
		0,
		0,
		1,
	];

	expect(compacted3).toEqual(expected3);
});

test("fromCompactBinary: convert a compact form into a path2", () => {
	const compacted1 = [
		2, // type
		1,
		0,
		0,
		0, // transforms
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0, // isClosed
		-1,
		-1,
		-1,
		-1, // color
	];
	const expected1 = create();
	const geometry1 = fromCompactBinary(compacted1);

	expect(geometry1).toEqual(expected1);

	const compacted2 = [
		2, // type
		1,
		0,
		0,
		0, // transforms
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		1, // closed/open flag
		-1,
		-1,
		-1,
		-1, // color
		0,
		0, // points
		1,
		0,
		0,
		1,
	];
	const points: Vec2[] = [
		[0, 0],
		[1, 0],
		[0, 1],
	];
	const expected2 = fromPoints({ closed: true }, points);
	const geometry2 = fromCompactBinary(compacted2);

	expect(geometry2).toEqual(expected2);

	// test color as well
	const compacted3 = [
		2, // type
		1,
		0,
		0,
		0, // transforms
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		1, // closed/open flag
		5,
		6,
		7,
		8, // color
		0,
		0, // points
		1,
		0,
		0,
		1,
	];
	const expected3 = fromPoints({ closed: true }, points);
	expected3.color = [5, 6, 7, 8];
	const geometry3 = fromCompactBinary(compacted3);

	expect(geometry3).toEqual(expected3);
});
