import type { Poly3 } from "./type";
import { expect, test } from "@rbxts/jest-globals";

import { comparePolygons } from "../../../test/helpers/index";
import { create } from "./index";

test("poly3: create() should return an empty poly3", () => {
	const obs = create();
	const exp = { vertices: [] };
	expect(obs).toEqual(exp);
});

test("poly3: create() should return a new poly3 with correct values", () => {
	const exp1: Poly3 = {
		vertices: [
			[0, 0, 0],
			[1, 0, 0],
			[1, 1, 0],
		],
	};
	const obs1 = create([
		[0, 0, 0],
		[1, 0, 0],
		[1, 1, 0],
	]);
	expect(comparePolygons(obs1, exp1)).toBe(true);

	const exp2: Poly3 = {
		vertices: [
			[1, 1, 0],
			[1, 0, 0],
			[0, 0, 0],
		],
	};
	const obs2 = create([
		[1, 1, 0],
		[1, 0, 0],
		[0, 0, 0],
	]); // opposite orientation
	expect(comparePolygons(obs2, exp2)).toBe(true);
});
