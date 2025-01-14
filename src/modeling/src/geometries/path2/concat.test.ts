import { expect, test } from "@rbxts/jest-globals";

import { concat, equals, fromPoints } from "./index";

test("concat: No paths produces an empty open path", () => {
	expect(equals(concat(), fromPoints({ closed: false }, []))).toBe(true);
});

test("concat: empty paths produces an empty open path", () => {
	expect(equals(concat(fromPoints({}, []), fromPoints({}, [])), fromPoints({ closed: false }, []))).toBe(true);
});

test("concat: many open paths produces a open path", () => {
	const p1 = fromPoints({ closed: false }, [[0, 0]]);
	const p2 = fromPoints({ closed: false }, [[1, 1]]);
	const p3 = fromPoints({ closed: false }, [
		[1, 1],
		[3, 3],
	]);

	const result = concat(p1, p2, p3);
	expect(
		equals(
			result,
			fromPoints({}, [
				[0, 0],
				[1, 1],
				[3, 3],
			]),
		),
	).toBe(true);
	expect(p1.points.size()).toBe(1);
	expect(p2.points.size()).toBe(1);
	expect(p3.points.size()).toBe(2);
});

test("concat: An open path and a closed path produces a closed path", () => {
	expect(
		equals(
			concat(fromPoints({ closed: false }, [[0, 0]]), fromPoints({ closed: true }, [[1, 1]])),
			fromPoints({ closed: true }, [
				[0, 0],
				[1, 1],
			]),
		),
	).toBe(true);
});

test("concat: A closed path and an open path throws an error", () => {
	const p1 = fromPoints({ closed: true }, [[0, 0]]);
	const p2 = fromPoints({ closed: false }, [[1, 1]]);
	expect(() => concat(p1, p2)).toThrowError({ message: "Cannot concatenate to a closed path; check the 1th path" });
});
