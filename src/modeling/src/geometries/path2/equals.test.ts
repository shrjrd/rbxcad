import { expect, test } from "@rbxts/jest-globals";

import { equals, fromPoints } from "./index";

test("equals: two paths with different points are not equal", () => {
	const p1 = fromPoints({ closed: false }, [
		[0, 0],
		[2, 0],
		[2, 1],
	]);
	const p2 = fromPoints({ closed: false }, [
		[0, 0],
		[2, 0],
		[2, 1],
		[0, 1],
	]);
	expect(equals(p1, p2)).toBe(false);

	const p3 = fromPoints({ closed: true }, [
		[2, 0],
		[2, 1],
		[0, 1],
		[1, 0],
	]);
	const p4 = fromPoints({ closed: true }, [
		[0, 0],
		[2, 0],
		[2, 1],
		[0, 1],
	]);
	expect(equals(p3, p4)).toBe(false);
});

test("equals: two open paths with the same points are equal", () => {
	const p1 = fromPoints({ closed: false }, [
		[0, 0],
		[2, 0],
		[2, 1],
		[0, 1],
	]);
	const p2 = fromPoints({ closed: false }, [
		[0, 0],
		[2, 0],
		[2, 1],
		[0, 1],
	]);
	expect(equals(p1, p2)).toBe(true);
});

test("equals: two open paths with the same points rotated are unequal", () => {
	expect(
		equals(
			fromPoints({ closed: false }, [
				[0, 0],
				[2, 0],
				[2, 1],
				[0, 1],
			]),
			fromPoints({ closed: false }, [
				[2, 0],
				[2, 1],
				[0, 1],
				[0, 0],
			]),
		),
	).toBe(false);
});

test("equals: two closed paths with the same points are equal", () => {
	expect(
		equals(
			fromPoints({ closed: true }, [
				[0, 0],
				[2, 0],
				[2, 1],
				[0, 1],
			]),
			fromPoints({ closed: true }, [
				[0, 0],
				[2, 0],
				[2, 1],
				[0, 1],
			]),
		),
	).toBe(true);

	// rotated
	expect(
		equals(
			fromPoints({ closed: true }, [
				[0, 0],
				[2, 0],
				[2, 1],
				[0, 1],
			]),
			fromPoints({ closed: true }, [
				[2, 0],
				[2, 1],
				[0, 1],
				[0, 0],
			]),
		),
	).toBe(true);
});

test("equals: closed path and open path with the same points are unequal", () => {
	expect(
		equals(
			fromPoints({ closed: true }, [
				[0, 0],
				[2, 0],
				[2, 1],
				[0, 1],
			]),
			fromPoints({ closed: false }, [
				[0, 0],
				[2, 0],
				[2, 1],
				[0, 1],
			]),
		),
	).toBe(false);
});
