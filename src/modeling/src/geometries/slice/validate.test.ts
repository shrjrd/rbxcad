import { expect, test } from "@rbxts/jest-globals";

import * as vec3 from "../../maths/vec3/index";
import { create, validate } from "./index";

// points of a triangle
const a = vec3.fromValues(0, 0, 2);
const b = vec3.fromValues(1, 0, 2);
const c = vec3.fromValues(1, 1, 2);
// non-coplanar
const d = vec3.fromValues(0, 0, 0);

test("validate: allow valid slice", () => {
	const geometry = create([[a, b, c]]);
	expect(() => validate(geometry)).never.toThrow();
});

test("validate: throw exception for non-coplanar contours", () => {
	const geometry = create([
		[a, b, c],
		[a, b, d],
	]);
	expect(() => validate(geometry)).toThrow();
});

test("validate: throw exception for duplicate points", () => {
	const geometry = create([[a, b, c, a]]);
	expect(() => validate(geometry)).toThrow();
});

test("validate: throw exception for NaN", () => {
	const geometry = create([[a, b, c, [0, 0, 0 / 0]]]);
	expect(() => validate(geometry)).toThrow();
});

test("validate: throw exception for infinity", () => {
	const geometry = create([[a, b, c, [0, 0, math.huge]]]);
	expect(() => validate(geometry)).toThrow();
});
