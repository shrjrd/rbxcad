import { expect, test } from "@rbxts/jest-globals";

import * as vec3 from "../../maths/vec3/index";
import { fromPoints, validate } from "./index";

// tetrahedron
const a = vec3.fromValues(-1, -1, 1);
const b = vec3.fromValues(-1, 1, -1);
const c = vec3.fromValues(1, -1, -1);
const d = vec3.fromValues(1, 1, 1);

test("validate: allow valid geom3", () => {
	// simplest valid geometry
	const geometry = fromPoints([
		[a, b, c],
		[d, b, a],
		[d, a, c],
		[c, b, d],
	]);
	expect(() => validate(geometry)).never.toThrow();
});

test("validate: throw exception for nan", () => {
	const geometry = fromPoints([
		[a, b, c],
		[d, b, a],
		[d, a, c],
		[c, b, [1, 1, 0 / 0]],
	]);
	expect(() => validate(geometry)).toThrow();
});

test("validate: throw exception for infinity", () => {
	const geometry = fromPoints([
		[a, b, c],
		[d, b, a],
		[d, a, c],
		[c, b, [1, 1, math.huge]],
	]);
	expect(() => validate(geometry)).toThrow();
});
