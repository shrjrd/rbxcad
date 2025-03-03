import type { Poly2 } from "../types";
import { expect, test } from "@rbxts/jest-globals";

import { create } from "./index";

test("poly2: create() should return a poly2 with initial values", () => {
	let obs = create();
	let exp: Poly2 = { points: [] };
	expect(obs).toEqual(exp);

	obs = create([
		[1, 1],
		[2, 2],
		[3, 3],
	]);
	exp = {
		points: [
			[1, 1],
			[2, 2],
			[3, 3],
		],
	};
	expect(obs).toEqual(exp);
});
