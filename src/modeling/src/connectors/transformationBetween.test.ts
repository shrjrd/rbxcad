import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../test/helpers/index";
import { create, fromPointAxisNormal, transformationBetween } from "./index";

test("connector: transformationBetween() should return correct transform matrices", () => {
	const connector1 = create();
	const connector2 = create();
	const connector3 = fromPointAxisNormal([0, 0, 0], [0, 0, 1], [0, 1, 0]); // Y axis as normal

	let obs = transformationBetween({}, connector1, connector2);
	let exp = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	expect(compareVectors(obs, exp)).toBe(true);

	obs = transformationBetween({}, connector1, connector3);
	exp = [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	expect(compareVectors(obs, exp)).toBe(true);

	// connectors as taken from V1 cube
	const faceCenter0 = fromPointAxisNormal([3, 0, 0], [1, 0, 0], [0, 0, 1]);
	const faceCenter1 = fromPointAxisNormal([-3, 0, 0], [-1, 0, 0], [0, 0, 1]);
	const faceCcenter2 = fromPointAxisNormal([0, 3, 0], [0, 1, 0], [0, 0, 1]);
	// const faceCenter3 = fromPointAxisNormal([0, -3, 0], [0, -1, 0], [0, 0, 1])
	// const faceCenter4 = fromPointAxisNormal([0, 0, 3], [0, 0, 1], [1, 0, 0])
	const faceCenter5 = fromPointAxisNormal([0, 0, -3], [0, 0, -1], [1, 0, 0]);

	obs = transformationBetween({}, faceCenter0, faceCenter1); // opposing faces
	exp = [-1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, -3.6739405577555036e-16, 0, 1];
	expect(compareVectors(obs, exp)).toBe(true);

	obs = transformationBetween({}, faceCcenter2, faceCenter5); // adjacent faces
	exp = [0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 3, -3, 0, 1];
	expect(compareVectors(obs, exp)).toBe(true);

	// test mirror option
	obs = transformationBetween({ mirror: true }, faceCenter0, faceCenter1); // opposing faces
	exp = [
		1, -2.4492937051703357e-16, 0, 0, 2.4492937051703357e-16, 1, 0, 0, 0, 0, 1, 0, -6, 7.347881115511007e-16, 0, 1,
	];
	expect(compareVectors(obs, exp)).toBe(true);
});
