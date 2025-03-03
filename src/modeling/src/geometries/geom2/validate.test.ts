import { expect, test } from "@rbxts/jest-globals";

import * as vec2 from "../../maths/vec2/index";
import { create, validate } from "./index";

// points of a square
// D-C
// | |
// A-B
const a = vec2.fromValues(0, 0);
const b = vec2.fromValues(1, 0);
const c = vec2.fromValues(1, 1);
const d = vec2.fromValues(0, 1);

test("validate: allow valid geom2", () => {
	const geometry = create([[a, b, c, d]]);
	expect(() => validate(geometry)).never.toThrow();
});

test("validate: throw exception for self-edge", () => {
	const geometry = create([[a, b, b, c]]);
	expect(() => validate(geometry)).toThrow();
});

test("validate: throw exception for self-intersecting polygon", () => {
	const bowtie = [a, d, b, c];
	const geometry = create([bowtie]);
	expect(() => validate(geometry)).toThrow();
});

test("validate: throw exception for nan", () => {
	const geometry = create([[a, b, c, [0, 0 / 0]]]);
	expect(() => validate(geometry)).toThrow();
});

test("validate: throw exception for infinity", () => {
	const geometry = create([[a, b, c, [0, math.huge]]]);
	expect(() => validate(geometry)).toThrow();
});
