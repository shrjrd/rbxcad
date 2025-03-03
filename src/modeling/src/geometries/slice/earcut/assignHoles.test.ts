import type { Geom2 } from "../../types";
import { expect, test } from "@rbxts/jest-globals";

import { subtract, union } from "../../../operations/booleans/index";
import { square } from "../../../primitives/index";
import { assignHoles } from "./assignHoles";

test("slice: assignHoles() should return a polygon hierarchy", () => {
	const exp1 = [
		{
			solid: [
				[-3, -3],
				[3, -3],
				[3, 3],
				[-3, 3],
			],
			holes: [
				[
					[-2, 2],
					[2, 2],
					[2, -2],
					[-2, -2],
				],
			],
		},
	];
	const geometry = subtract(square({ size: 6 }), square({ size: 4 })) as Geom2;
	const obs1 = assignHoles(geometry);
	expect(obs1).toEqual(exp1);
});

test("slice: assignHoles() should handle nested holes", () => {
	const geometry = union(
		subtract(square({ size: 6 }), square({ size: 4 })) as Geom2,
		subtract(square({ size: 10 }), square({ size: 8 })) as Geom2,
	) as Geom2;
	const obs1 = assignHoles(geometry);

	const exp1 = [
		{
			solid: [
				[-5, -5],
				[5, -5],
				[5, 5],
				[-5, 5],
			],
			holes: [
				[
					[-4, 4],
					[4, 4],
					[4, -4],
					[-4, -4],
				],
			],
		},
		{
			solid: [
				[-3, -3],
				[3, -3],
				[3, 3],
				[-3, 3],
			],
			holes: [
				[
					[-2, 2],
					[2, 2],
					[2, -2],
					[-2, -2],
				],
			],
		},
	];
	expect(obs1).toEqual(exp1);
});
