import { expect, test } from "@rbxts/jest-globals";

import { cube, cuboid } from "../primitives";
import measureAggregateArea from "./measureAggregateArea";

test("measureAggregateArea (single objects)", () => {
	const aCube = cube({ size: 4, center: [4, 10, 20] });
	const area = measureAggregateArea(aCube);
	expect(area).toBe(4 * 4 * 6);
});

test("measureAggregateArea (multiple objects)", () => {
	const cube1 = cube({ size: 4, center: [4, -10, 20] });
	const cuboid2 = cuboid({ size: [1, 4, 10], center: [0, -20, 20] });

	const expectedArea = 4 * 4 * 6 + 2 * (1 * 4 + 1 * 10 + 4 * 10);
	let volume = measureAggregateArea(cube1, cuboid2);
	expect(volume).toBe(expectedArea);

	volume = measureAggregateArea([cube1, cuboid2]);
	expect(volume).toBe(expectedArea);
});
