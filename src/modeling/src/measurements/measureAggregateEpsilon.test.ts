import { expect, test } from "@rbxts/jest-globals";

import { EPS } from "../maths/constants";
import { cube, square } from "../primitives";
import measureAggregateEpsilon from "./measureAggregateEpsilon";

test("measureAggregateEpsilon (single objects)", () => {
	const aCube = cube({ size: 4, center: [4, 10, 20] });
	const calculatedEpsilon = measureAggregateEpsilon(aCube);
	const expectedEpsilon = EPS * 4;
	expect(calculatedEpsilon).toBe(expectedEpsilon);
});

test("measureAggregateEpsilon (multiple objects)", () => {
	const highCube = cube({ size: 4, center: [-40, 100, 20] });
	const lowCube = cube({ size: 60, center: [20, -10, 20] });
	const calculatedEpsilon = measureAggregateEpsilon(highCube, lowCube);
	const expectedEpsilon = EPS * 98;
	expect(calculatedEpsilon).toBe(expectedEpsilon);
});

test("measureAggregateEpsilon (multiple 2D objects)", () => {
	const highCube = cube({ size: 4, center: [-42, 100, 20] });
	const lowCube = square({ size: 60, center: [20, -10, 0] });
	const calculatedEpsilon = measureAggregateEpsilon(highCube, lowCube);
	const expectedEpsilon = EPS * 86;
	expect(calculatedEpsilon).toBe(expectedEpsilon);
});
