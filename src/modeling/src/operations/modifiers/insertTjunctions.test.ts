import { expect, test } from "@rbxts/jest-globals";

import { comparePolygonLists } from "../../../test/helpers";
import { geom3, poly3 } from "../../geometries";
import { cuboid } from "../../primitives";
import insertTjunctions from "./insertTjunctions";

test("insertTjunctions: insertTjunctions produces expected polygons", () => {
	const geometry1 = geom3.create();
	const geometry2 = cuboid({ size: [2, 2, 2] });
	const geometry3 = geom3.fromPoints([
		[
			[-1, -1, -1],
			[-1, -1, 1],
			[-1, 1, 1],
			[-1, 1, -1],
		],
		[
			[1, -1, -1],
			[1, 1, -1],
			[1, 1, 1],
			[1, -1, 1],
		],
		[
			[-1, -1, -1],
			[1, -1, -1],
			[1, -1, 1],
			[-1, -1, 1],
		],
		[
			[-1, 1, -1],
			[-1, 1, 1],
			[1, 1, 1],
			[1, 1, -1],
		],
		[
			[-1, -1, -1],
			[-1, 1, -1],
			[1, 1, -1],
			[1, -1, -1],
		],
		// T junction
		[
			[-1, -1, 1],
			[1, -1, 1],
			[1, 1, 1],
		],
		[
			[1, 1, 1],
			[-1, 1, 1],
			[0, 0, 1],
		],
		[
			[-1, 1, 1],
			[-1, -1, 1],
			[0, 0, 1],
		],
	]);
	const geometry4 = geom3.fromPoints([
		[
			[-1, -1, -1],
			[-1, -1, 1],
			[-1, 1, 1],
			[-1, 1, -1],
		],
		[
			[1, -1, -1],
			[1, 1, -1],
			[1, 1, 1],
			[1, -1, 1],
		],
		[
			[-1, -1, -1],
			[1, -1, -1],
			[1, -1, 1],
			[-1, -1, 1],
		],
		[
			[-1, 1, -1],
			[-1, 1, 1],
			[1, 1, 1],
			[1, 1, -1],
		],
		[
			[-1, -1, -1],
			[-1, 1, -1],
			[1, 1, -1],
			[1, -1, -1],
		],
		// T junctions
		[
			[-1, -1, 1],
			[0, -1, 1],
			[0, 0, 1],
		],
		[
			[-1, 0, 1],
			[-1, -1, 1],
			[0, 0, 1],
		],

		[
			[0, -1, 1],
			[1, -1, 1],
			[0, 0, 1],
		],
		[
			[1, -1, 1],
			[1, 0, 1],
			[0, 0, 1],
		],

		[
			[1, 0, 1],
			[1, 1, 1],
			[0, 0, 1],
		],
		[
			[1, 1, 1],
			[0, 1, 1],
			[0, 0, 1],
		],

		[
			[0, 1, 1],
			[-1, 1, 1],
			[0, 0, 1],
		],
		[
			[-1, 1, 1],
			[-1, 0, 1],
			[0, 0, 1],
		],
	]);

	const result1 = insertTjunctions(geom3.toPolygons(geometry1));
	expect(result1).toBe(geom3.toPolygons(geometry1)); // no T junctions

	const result2 = insertTjunctions(geom3.toPolygons(geometry2));
	expect(result2).toBe(geom3.toPolygons(geometry2)); // no T junctions

	// NOTE: insertTjunctions does NOT split the polygon, it just adds a new point at each T

	const result3 = insertTjunctions(geom3.toPolygons(geometry3));
	let exp = [
		poly3.create([
			[-1, -1, -1],
			[-1, -1, 1],
			[-1, 1, 1],
			[-1, 1, -1],
		]),
		poly3.create([
			[1, -1, -1],
			[1, 1, -1],
			[1, 1, 1],
			[1, -1, 1],
		]),
		poly3.create([
			[-1, -1, -1],
			[1, -1, -1],
			[1, -1, 1],
			[-1, -1, 1],
		]),
		poly3.create([
			[-1, 1, -1],
			[-1, 1, 1],
			[1, 1, 1],
			[1, 1, -1],
		]),
		poly3.create([
			[-1, -1, -1],
			[-1, 1, -1],
			[1, 1, -1],
			[1, -1, -1],
		]),
		poly3.create([
			[0, 0, 1],
			[-1, -1, 1],
			[1, -1, 1],
			[1, 1, 1],
		]),
		poly3.create([
			[1, 1, 1],
			[-1, 1, 1],
			[0, 0, 1],
		]),
		poly3.create([
			[-1, 1, 1],
			[-1, -1, 1],
			[0, 0, 1],
		]),
	];
	expect(result3).never.toBe(geom3.toPolygons(geometry3));
	expect(comparePolygonLists(result3, exp)).toBe(true);

	const result4 = insertTjunctions(geom3.toPolygons(geometry4));
	exp = [
		poly3.create([
			[-1, -1, -1],
			[-1, -1, 1],
			[-1, 0, 1],
			[-1, 1, 1],
			[-1, 1, -1],
		]),
		poly3.create([
			[1, -1, -1],
			[1, 1, -1],
			[1, 1, 1],
			[1, 0, 1],
			[1, -1, 1],
		]),
		poly3.create([
			[-1, -1, -1],
			[1, -1, -1],
			[1, -1, 1],
			[0, -1, 1],
			[-1, -1, 1],
		]),
		poly3.create([
			[-1, 1, -1],
			[-1, 1, 1],
			[0, 1, 1],
			[1, 1, 1],
			[1, 1, -1],
		]),
		poly3.create([
			[-1, -1, -1],
			[-1, 1, -1],
			[1, 1, -1],
			[1, -1, -1],
		]),
		poly3.create([
			[-1, -1, 1],
			[0, -1, 1],
			[0, 0, 1],
		]),
		poly3.create([
			[-1, 0, 1],
			[-1, -1, 1],
			[0, 0, 1],
		]),
		poly3.create([
			[0, -1, 1],
			[1, -1, 1],
			[0, 0, 1],
		]),
		poly3.create([
			[1, -1, 1],
			[1, 0, 1],
			[0, 0, 1],
		]),
		poly3.create([
			[1, 0, 1],
			[1, 1, 1],
			[0, 0, 1],
		]),
		poly3.create([
			[1, 1, 1],
			[0, 1, 1],
			[0, 0, 1],
		]),
		poly3.create([
			[0, 1, 1],
			[-1, 1, 1],
			[0, 0, 1],
		]),
		poly3.create([
			[-1, 1, 1],
			[-1, 0, 1],
			[0, 0, 1],
		]),
	];
	expect(result4).never.toBe(geometry4);
	expect(comparePolygonLists(result4, exp)).toBe(true);
});
