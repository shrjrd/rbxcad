import { expect, test } from "@rbxts/jest-globals";

import { cube, cuboid } from "../primitives";
import measureAggregateVolume from "./measureAggregateVolume";

test("measureAggregateVolume (single objects)", () => {
	const aCube = cube({ size: 4, center: [4, 10, 20] });
	const volume = measureAggregateVolume(aCube);
	expect(volume).toBe(64);
});

test("measureAggregateVolume (multiple objects)", () => {
	const cube1 = cube({ size: 4, center: [4, -10, 20] });
	const cuboid2 = cuboid({ size: [1, 4, 10], center: [0, -20, 20] });

	let volume = measureAggregateVolume(cube1, cuboid2);
	expect(volume).toBe(104);

	volume = measureAggregateVolume([cube1, cuboid2]);
	expect(volume).toBe(104);
});
