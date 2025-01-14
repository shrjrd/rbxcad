import { expect, test } from "@rbxts/jest-globals";
import { Number } from "@rbxts/luau-polyfill";

import { nearlyEqual } from "../../../test/helpers/index";
import { EPS } from "../constants";
import { create, fromPoints, xAtY } from "./index";

test("line2: xAtY() should return proper values", () => {
	const line1 = create();

	const x1 = xAtY(line1, 0);
	nearlyEqual(x1, 0, EPS);

	const x2 = xAtY(line1, 6);
	expect(Number.isFinite(x2)).toBe(false); // X is infinite, as the line is parallel to X-axis

	const x3 = xAtY(line1, -6);
	expect(Number.isFinite(x3)).toBe(false); // X is infinite, as the line is parallel to X-axis

	const line2 = fromPoints(create(), [-5, 4], [5, -6]);
	const y1 = xAtY(line2, 0);
	nearlyEqual(y1, -1, EPS);

	const y2 = xAtY(line2, 1);
	nearlyEqual(y2, -2, EPS);

	const y3 = xAtY(line2, 2);
	nearlyEqual(y3, -3, EPS);

	const y4 = xAtY(line2, -1);
	nearlyEqual(y4, 0, EPS);

	const y5 = xAtY(line2, -2);
	nearlyEqual(y5, 1, EPS);

	const y6 = xAtY(line2, -3);
	nearlyEqual(y6, 2, EPS);

	expect(true).toBe(true);
});
