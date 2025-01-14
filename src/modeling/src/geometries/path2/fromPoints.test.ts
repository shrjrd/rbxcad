import { expect, test } from "@rbxts/jest-globals";

import vec2 from "../../maths/vec2";
import { fromPoints, toPoints, toString } from "./index";

test("fromPoints: creating a path from no points produces an open, empty non-canonical path", () => {
	const created = fromPoints({}, []);
	expect(created.isClosed).toBe(false);
	expect(toPoints(created)).toEqual([]);
});

test("fromPoints: creating a path from one point produces a open, non-canonical path", () => {
	const created = fromPoints({}, [[1, 1]]);
	toString(created);

	expect(created.isClosed).toBe(false);
	expect(toPoints(created)).toEqual([vec2.fromValues(1, 1)]);
});

test("fromPoints: creating a closed path from one point produces a closed, non-canonical path", () => {
	const created = fromPoints({ closed: true }, [[1, 1]]);
	expect(created.isClosed).toBe(true);
	expect(toPoints(created)).toEqual([vec2.fromValues(1, 1)]);

	toString(created);
});

test("fromPoints: creating a path from a closed set of points creates a closed, non-canonical path", () => {
	const created = fromPoints({ closed: false }, [
		[0, 0],
		[1, 0],
		[1, 1],
		[0, 0],
	]);
	expect(created.isClosed).toBe(true);
	expect(3).toBe(created.points.size()); // the last given point is dropped
});
