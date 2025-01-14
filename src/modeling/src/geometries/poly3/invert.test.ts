import { expect, test } from "@rbxts/jest-globals";

import { comparePolygons } from "../../../test/helpers/index";
import { fromPoints, invert } from "./index";

test("poly3: invert() should return a new poly3 with correct values", () => {
	const exp1: Poly3 = {
		vertices: [
			[1, 1, 0],
			[1, 0, 0],
			[0, 0, 0],
		],
	};
	const org1 = fromPoints([
		[0, 0, 0],
		[1, 0, 0],
		[1, 1, 0],
	]);
	const ret1 = invert(org1);
	expect(comparePolygons(ret1, exp1)).toBe(true);

	const exp2: Poly3 = {
		vertices: [
			[0, 0, 0],
			[1, 0, 0],
			[1, 1, 0],
		],
	};
	const org2 = fromPoints([
		[1, 1, 0],
		[1, 0, 0],
		[0, 0, 0],
	]);
	const ret2 = invert(org2);
	expect(comparePolygons(ret2, exp2)).toBe(true);
	expect(comparePolygons(ret2, org2)).toBe(false); // the original should NOT change
});
