import type { Vec3 } from "../../maths/types";
import { expect, test } from "@rbxts/jest-globals";

import { comparePolygonsAsPoints } from "../../../test/helpers/index";
import { fromPoints, toPoints, toString } from "./index";

test("toPoints: Creates an array of vertices from a populated geom3", () => {
	const vertices: Vec3[][] = [
		[
			[0, 0, 0],
			[1, 0, 0],
			[1, 0, 1],
		],
	];
	const geometry = fromPoints(vertices);

	toString(geometry);

	const expected = [
		[
			[0, 0, 0],
			[1, 0, 0],
			[1, 0, 1],
		],
	];
	const vertexList = toPoints(geometry);
	expect(vertexList).toEqual(expected);
	expect(comparePolygonsAsPoints(vertexList, expected)).toBe(true);

	toString(geometry);
});
