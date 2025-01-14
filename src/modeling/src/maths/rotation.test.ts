import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../test/helpers/index";
import { constants, mat4, vec2, vec3 } from "./index";

// ALL POSITIVE ROTATIONS ARE CLOCKWISE
// see https://webglfundamentals.org/webgl/lessons/webgl-3d-orthographic.html
// IN A LEFT-HANDED COORDINATE SYSTEM

// JSCAD IS RIGHT-HANDED COORDINATE SYSTEM
// WHERE POSITIVE ROTATIONS ARE COUNTER-CLOCKWISE

// identity matrices for comparisons

const rad90 = constants.TAU / 4;

// +90 degree rotation about X
const cwX90Matrix = [
	1,
	0,
	0,
	0,
	0,
	math.cos(rad90),
	math.sin(rad90),
	0,
	0,
	-math.sin(rad90),
	math.cos(rad90),
	0,
	0,
	0,
	0,
	1,
];
// +90 degree rotation about Y
const cwY90Matrix = [
	math.cos(rad90),
	0,
	-math.sin(rad90),
	0,
	0,
	1,
	0,
	0,
	math.sin(rad90),
	0,
	math.cos(rad90),
	0,
	0,
	0,
	0,
	1,
];
// +90 degree rotation about Z
const cwZ90Matrix = [
	math.cos(rad90),
	math.sin(rad90),
	0,
	0,
	-math.sin(rad90),
	math.cos(rad90),
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
];

test("rotation: mat4 rotation functions should produce expected results", () => {
	const idn = mat4.create();
	let obs;

	// test matrices for rotating about X axis
	obs = mat4.fromXRotation(mat4.create(), rad90);
	expect(compareVectors(obs, cwX90Matrix)).toBe(true);

	obs = mat4.fromRotation(mat4.create(), rad90, [1, 0, 0]);
	expect(compareVectors(obs, cwX90Matrix)).toBe(true);

	obs = mat4.rotateX(obs, idn, rad90);
	expect(compareVectors(obs, cwX90Matrix)).toBe(true);

	// test matrices for rotating about Y axis
	obs = mat4.fromYRotation(mat4.create(), rad90);
	expect(compareVectors(obs, cwY90Matrix)).toBe(true);

	obs = mat4.fromRotation(mat4.create(), rad90, [0, 1, 0]);
	expect(compareVectors(obs, cwY90Matrix)).toBe(true);

	obs = mat4.rotateY(obs, idn, rad90);
	expect(compareVectors(obs, cwY90Matrix)).toBe(true);

	// test matrices for rotating about Z axis
	obs = mat4.fromZRotation(mat4.create(), rad90);
	expect(compareVectors(obs, cwZ90Matrix)).toBe(true);

	obs = mat4.fromRotation(mat4.create(), rad90, [0, 0, 1]);
	expect(compareVectors(obs, cwZ90Matrix)).toBe(true);

	obs = mat4.rotateZ(obs, idn, rad90);
	expect(compareVectors(obs, cwZ90Matrix)).toBe(true);
});

test("rotation: vec2 rotation functions should produce expected results", () => {
	const onX = vec2.fromValues(3, 0);
	const onY = vec2.fromValues(0, 3);
	const matZ = mat4.fromZRotation(mat4.create(), rad90);

	// transform
	const t1 = vec2.transform(vec2.create(), onX, matZ);
	expect(compareVectors(t1, [0, 3])).toBe(true);

	const t2 = vec2.transform(vec2.create(), onY, matZ);
	expect(compareVectors(t2, [-3, 0])).toBe(true);

	// rotate
	const r1 = vec2.rotate(vec2.create(), onX, vec2.create(), rad90);
	expect(compareVectors(r1, [0, 3])).toBe(true);

	const r2 = vec2.rotate(vec2.create(), onY, vec2.create(), rad90);
	expect(compareVectors(r2, [-3, 0])).toBe(true);

	// verify
	expect(compareVectors(t1, r1)).toBe(true);
	expect(compareVectors(t2, r2)).toBe(true);
});

test("rotation: vec3 rotation functions should produce expected results", () => {
	const onX = vec3.fromValues(3, 0, 0);
	const onY = vec3.fromValues(0, 3, 0);
	const onZ = vec3.fromValues(0, 0, 3);
	const matX = mat4.fromXRotation(mat4.create(), rad90);
	const matY = mat4.fromYRotation(mat4.create(), rad90);
	const matZ = mat4.fromZRotation(mat4.create(), rad90);

	// transform
	const t1 = vec3.transform(vec3.create(), onX, matZ);
	expect(compareVectors(t1, [0, 3, 0])).toBe(true);

	const t2 = vec3.transform(vec3.create(), onY, matX);
	expect(compareVectors(t2, [0, 0, 3])).toBe(true);

	const t3 = vec3.transform(vec3.create(), onZ, matY);
	expect(compareVectors(t3, [3, 0, 0])).toBe(true);

	// rotate
	const r1 = vec3.rotateZ(vec3.create(), onX, [0, 0, 0], rad90);
	expect(compareVectors(r1, [0, 3, 0])).toBe(true);

	const r2 = vec3.rotateX(vec3.create(), onY, [0, 0, 0], rad90);
	expect(compareVectors(r2, [0, 0, 3])).toBe(true);

	const r3 = vec3.rotateY(vec3.create(), onZ, [0, 0, 0], rad90);
	expect(compareVectors(r3, [3, 0, 0])).toBe(true);

	// verify
	expect(compareVectors(t1, r1)).toBe(true);
	expect(compareVectors(t2, r2)).toBe(true);
	expect(compareVectors(t3, r3)).toBe(true);
});
