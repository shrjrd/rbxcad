import { expect, test } from "@rbxts/jest-globals";

import { comparePolygons } from "../../../test/helpers/index";
import { fromPoints } from "./index";

test("poly3: fromPoints() should return a new poly3 with correct values", () => {
	const exp1: Poly3 = {
		vertices: [
			[0, 0, 0],
			[1, 0, 0],
			[1, 1, 0],
		],
	};
	const obs1 = fromPoints([
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
	const obs2 = fromPoints([
		[1, 1, 0],
		[1, 0, 0],
		[0, 0, 0],
	]); // opposite orientation
	expect(comparePolygons(obs2, exp2)).toBe(true);
});
