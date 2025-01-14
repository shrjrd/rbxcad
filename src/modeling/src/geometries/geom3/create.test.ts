import { expect, test } from "@rbxts/jest-globals";

import poly3 from "../poly3";
import { create } from "./index";

test("create: Creates an empty geom3", () => {
	const expected = {
		polygons: [],
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	expect(create()).toEqual(expected);
});

test("create: Creates a populated geom3", () => {
	const points: Vec3[] = [
		[0, 0, 0],
		[0, 10, 0],
		[0, 10, 10],
	];
	const polygon = poly3.create(points);

	const polygons = [polygon];
	const expected = {
		polygons: polygons,
		transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	};
	expect(create(polygons)).toEqual(expected);
});
