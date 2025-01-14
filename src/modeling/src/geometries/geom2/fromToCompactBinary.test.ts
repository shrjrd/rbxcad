import { expect, test } from "@rbxts/jest-globals";

import { create, fromCompactBinary, toCompactBinary } from "./index";

test("toCompactBinary: converts geom2 into a compact form", () => {
	const geometry1 = create();
	const compacted1 = toCompactBinary(geometry1);
	const expected1 = [
		0, // type flag
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
		-1,
		-1,
		-1,
		-1, // color
	];
	expect(compacted1).toEqual(expected1);

	// geometry with a hole
	const geometry2 = create([
		[
			[10, 10],
			[-10, -10],
		],
		[
			[-10, -10],
			[10, -10],
		],
		[
			[10, -10],
			[10, 10],
		],
		[
			[5, -5],
			[6, -4],
		],
		[
			[6, -5],
			[5, -5],
		],
		[
			[6, -4],
			[6, -5],
		],
	]);
	const compacted2 = toCompactBinary(geometry2);
	const expected2 = [
		0, // type flag
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
		-1,
		-1,
		-1,
		-1, // color
		10,
		10,
		-10,
		-10, // sides
		-10,
		-10,
		10,
		-10,
		10,
		-10,
		10,
		10,
		5,
		-5,
		6,
		-4,
		6,
		-5,
		5,
		-5,
		6,
		-4,
		6,
		-5,
	];
	expect(compacted2).toEqual(expected2);

	// test color as well
	geometry2.color = [1, 2, 3, 4];
	const compacted3 = toCompactBinary(geometry2);
	const expected3 = [
		0, // type flag
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
		1,
		2,
		3,
		4, // color
		10,
		10,
		-10,
		-10, // sides
		-10,
		-10,
		10,
		-10,
		10,
		-10,
		10,
		10,
		5,
		-5,
		6,
		-4,
		6,
		-5,
		5,
		-5,
		6,
		-4,
		6,
		-5,
	];
	expect(compacted3).toEqual(expected3);
});

test("fromCompactBinary: convert a compact form into a geom2", () => {
	const compacted1 = [
		0, // type flag
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
		-1,
		-1,
		-1,
		-1, // color
	];
	const expected1 = create();
	const geometry1 = fromCompactBinary(compacted1);

	expect(geometry1).toEqual(expected1);

	// geometry with a hole
	const compacted2 = [
		0, // type flag
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
		-1,
		-1,
		-1,
		-1, // color
		10,
		10,
		-10,
		-10, // sides
		-10,
		-10,
		10,
		-10,
		10,
		-10,
		10,
		10,
		5,
		-5,
		6,
		-4,
		6,
		-5,
		5,
		-5,
		6,
		-4,
		6,
		-5,
	];
	const expected2 = create([
		[
			[10, 10],
			[-10, -10],
		],
		[
			[-10, -10],
			[10, -10],
		],
		[
			[10, -10],
			[10, 10],
		],
		[
			[5, -5],
			[6, -4],
		],
		[
			[6, -5],
			[5, -5],
		],
		[
			[6, -4],
			[6, -5],
		],
	]);
	const geometry2 = fromCompactBinary(compacted2);

	expect(geometry2).toEqual(expected2);

	// test color as well
	const compacted3 = [
		0, // type flag
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
		4,
		5,
		6,
		7, // color
		10,
		10,
		-10,
		-10, // sides
		-10,
		-10,
		10,
		-10,
		10,
		-10,
		10,
		10,
		5,
		-5,
		6,
		-4,
		6,
		-5,
		5,
		-5,
		6,
		-4,
		6,
		-5,
	];
	expected2.color = [4, 5, 6, 7];
	const geometry3 = fromCompactBinary(compacted3);

	expect(geometry3).toEqual(expected2);
});
