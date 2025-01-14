import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import vec3 from "../vec3";
import create from "./create";
import fromVectorRotation from "./fromVectorRotation";

test("mat4: fromVectorRotation() called with out parameter should return a mat4 with correct values", () => {
	// unit vectors, same directions
	const out = create();
	let ret = fromVectorRotation(out, [1, 0, 0], [1, 0, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, 1, 0], [0, 1, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, 0, 1], [0, 0, 1]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	// unit vectors, axis rotations
	ret = fromVectorRotation(out, [1, 0, 0], [0, 1, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [1, 0, 0], [0, 0, 1]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, 1, 0], [1, 0, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, 1, 0], [0, 0, 1]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, 0, 1], [1, 0, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, 0, 1], [0, 1, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [-1, 0, 0], [0, -1, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [-1, 0, 0], [0, 0, -1]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, -1, 0], [-1, 0, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, -1, 0], [0, 0, -1]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, 0, -1], [-1, 0, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, 0, -1], [0, -1, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1])).toBe(true);

	// unit vector, opposite directions
	ret = fromVectorRotation(out, [1, 0, 0], [-1, 0, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [-1, 0, 0], [1, 0, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, 1, 0], [0, -1, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, -1, 0], [0, 1, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, 0, 1], [0, 0, -1]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, 0, -1], [0, 0, 1]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1])).toBe(true);

	// different units
	ret = fromVectorRotation(out, [11, 0, 0], [0, 33, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, 0.11, 0], [0, 0, 0.33]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1])).toBe(true);

	ret = fromVectorRotation(out, [0, 0, 111111.0], [0, 0.33, 0]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1])).toBe(true);

	// different quadrants
	ret = fromVectorRotation(out, [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5]);
	expect(ret).toBe(out);
	expect(
		compareVectors(
			out,
			[
				0.3333333333333334, 0.6666666666666669, 0.6666666666666669, 0, -0.6666666666666669, 0.666666666666667,
				-0.3333333333333335, 0, -0.6666666666666669, -0.3333333333333335, 0.666666666666667, 0, 0, 0, 0, 1,
			],
		),
	).toBe(true);
	expect(compareVectors([-0.5, 0.5, 0.5], vec3.transform(vec3.create(), [0.5, 0.5, 0.5], ret))).toBe(true);

	ret = fromVectorRotation(out, [5, 5, 5], [5, 5, -5]);
	expect(ret).toBe(out);
	expect(
		compareVectors(
			out,
			[
				0.6666666666666666, -0.3333333333333333, -0.6666666666666666, 0, -0.3333333333333333,
				0.6666666666666666, -0.6666666666666666, 0, 0.6666666666666666, 0.6666666666666666, 0.3333333333333333,
				0, 0, 0, 0, 1,
			],
		),
	).toBe(true);
	expect(compareVectors([5, 5, -5], vec3.transform(vec3.create(), [5, 5, 5], ret))).toBe(true);

	ret = fromVectorRotation(out, [5, 5, 5], [-5, -5, -5]);
	expect(ret).toBe(out);
	expect(compareVectors(out, [0, -1, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1])).toBe(true);
	expect(compareVectors([-5, -5, -5], vec3.transform(vec3.create(), [5, 5, 5], ret))).toBe(true);
});
