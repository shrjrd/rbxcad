import { expect, test } from "@rbxts/jest-globals";

import { compareVectors } from "../../../test/helpers/index";
import { create, fromPoints, origin } from "./index";

test("line2: origin() should return proper origins", () => {
	const line1 = create();
	const org1 = origin(line1);
	expect(compareVectors(org1, [0, 0])).toBe(true);

	const line2 = fromPoints(create(), [1, 0], [0, 1]);
	const org2 = origin(line2);
	expect(compareVectors(org2, [0.5000000000000001, 0.5])).toBe(true);

	const line3 = fromPoints(create(), [0, 1], [1, 0]);
	const org3 = origin(line3);
	expect(compareVectors(org3, [0.5, 0.4999999999999999])).toBe(true);

	const line4 = fromPoints(create(), [0, 6], [6, 0]);
	const org4 = origin(line4);
	expect(compareVectors(org4, [3.0000000000000004, 3.0000000000000004])).toBe(true);

	const line5 = fromPoints(create(), [-5, 5], [5, -5]);
	const org5 = origin(line5);
	expect(compareVectors(org5, [0, 0])).toBe(true);

	const line6 = fromPoints(create(), [10, 0], [0, 10]);
	const org6 = origin(line6);
	expect(compareVectors(org6, [5, 5])).toBe(true);
});
