import { expect, test } from "@rbxts/jest-globals";

import { comparePolygonsAsPoints } from "../../../test/helpers";
import { geom3 } from "../../geometries";
import { cuboid, sphere } from "../../primitives";
import { center } from "../transforms/center";
import { subtract } from "./index";

test("subtract: subtract of one or more geom3 objects produces expected geometry", () => {
	const geometry1 = sphere({ radius: 2, segments: 8 });

	// subtract of one object
	const result1 = subtract(geometry1) as Geom3;
	let obs = geom3.toPoints(result1);
	let exp: Vec3[][] = [
		[
			[2, 0, 0],
			[1.4142135623730951, -1.414213562373095, 0],
			[1.0000000000000002, -1, -1.414213562373095],
			[1.4142135623730951, 0, -1.414213562373095],
		],
		[
			[1.4142135623730951, 0, 1.414213562373095],
			[1.0000000000000002, -1, 1.414213562373095],
			[1.4142135623730951, -1.414213562373095, 0],
			[2, 0, 0],
		],
		[
			[1.4142135623730951, 0, -1.414213562373095],
			[1.0000000000000002, -1, -1.414213562373095],
			[1.2246467991473532e-16, 0, -2],
		],
		[
			[1.2246467991473532e-16, 0, 2],
			[1.0000000000000002, -1, 1.414213562373095],
			[1.4142135623730951, 0, 1.414213562373095],
		],
		[
			[1.4142135623730951, -1.414213562373095, 0],
			[1.2246467991473532e-16, -2, 0],
			[8.659560562354934e-17, -1.4142135623730951, -1.414213562373095],
			[1.0000000000000002, -1, -1.414213562373095],
		],
		[
			[1.0000000000000002, -1, 1.414213562373095],
			[8.659560562354934e-17, -1.4142135623730951, 1.414213562373095],
			[1.2246467991473532e-16, -2, 0],
			[1.4142135623730951, -1.414213562373095, 0],
		],
		[
			[1.0000000000000002, -1, -1.414213562373095],
			[8.659560562354934e-17, -1.4142135623730951, -1.414213562373095],
			[8.659560562354934e-17, -8.659560562354932e-17, -2],
		],
		[
			[8.659560562354934e-17, -8.659560562354932e-17, 2],
			[8.659560562354934e-17, -1.4142135623730951, 1.414213562373095],
			[1.0000000000000002, -1, 1.414213562373095],
		],
		[
			[1.2246467991473532e-16, -2, 0],
			[-1.414213562373095, -1.4142135623730951, 0],
			[-1, -1.0000000000000002, -1.414213562373095],
			[8.659560562354934e-17, -1.4142135623730951, -1.414213562373095],
		],
		[
			[8.659560562354934e-17, -1.4142135623730951, 1.414213562373095],
			[-1, -1.0000000000000002, 1.414213562373095],
			[-1.414213562373095, -1.4142135623730951, 0],
			[1.2246467991473532e-16, -2, 0],
		],
		[
			[8.659560562354934e-17, -1.4142135623730951, -1.414213562373095],
			[-1, -1.0000000000000002, -1.414213562373095],
			[7.498798913309288e-33, -1.2246467991473532e-16, -2],
		],
		[
			[7.498798913309288e-33, -1.2246467991473532e-16, 2],
			[-1, -1.0000000000000002, 1.414213562373095],
			[8.659560562354934e-17, -1.4142135623730951, 1.414213562373095],
		],
		[
			[-1.414213562373095, -1.4142135623730951, 0],
			[-2, -2.4492935982947064e-16, 0],
			[-1.4142135623730951, -1.7319121124709868e-16, -1.414213562373095],
			[-1, -1.0000000000000002, -1.414213562373095],
		],
		[
			[-1, -1.0000000000000002, 1.414213562373095],
			[-1.4142135623730951, -1.7319121124709868e-16, 1.414213562373095],
			[-2, -2.4492935982947064e-16, 0],
			[-1.414213562373095, -1.4142135623730951, 0],
		],
		[
			[-1, -1.0000000000000002, -1.414213562373095],
			[-1.4142135623730951, -1.7319121124709868e-16, -1.414213562373095],
			[-8.659560562354932e-17, -8.659560562354934e-17, -2],
		],
		[
			[-8.659560562354932e-17, -8.659560562354934e-17, 2],
			[-1.4142135623730951, -1.7319121124709868e-16, 1.414213562373095],
			[-1, -1.0000000000000002, 1.414213562373095],
		],
		[
			[-2, -2.4492935982947064e-16, 0],
			[-1.4142135623730954, 1.414213562373095, 0],
			[-1.0000000000000002, 1, -1.414213562373095],
			[-1.4142135623730951, -1.7319121124709868e-16, -1.414213562373095],
		],
		[
			[-1.4142135623730951, -1.7319121124709868e-16, 1.414213562373095],
			[-1.0000000000000002, 1, 1.414213562373095],
			[-1.4142135623730954, 1.414213562373095, 0],
			[-2, -2.4492935982947064e-16, 0],
		],
		[
			[-1.4142135623730951, -1.7319121124709868e-16, -1.414213562373095],
			[-1.0000000000000002, 1, -1.414213562373095],
			[-1.2246467991473532e-16, -1.4997597826618576e-32, -2],
		],
		[
			[-1.2246467991473532e-16, -1.4997597826618576e-32, 2],
			[-1.0000000000000002, 1, 1.414213562373095],
			[-1.4142135623730951, -1.7319121124709868e-16, 1.414213562373095],
		],
		[
			[-1.4142135623730954, 1.414213562373095, 0],
			[-3.6739403974420594e-16, 2, 0],
			[-2.59786816870648e-16, 1.4142135623730951, -1.414213562373095],
			[-1.0000000000000002, 1, -1.414213562373095],
		],
		[
			[-1.0000000000000002, 1, 1.414213562373095],
			[-2.59786816870648e-16, 1.4142135623730951, 1.414213562373095],
			[-3.6739403974420594e-16, 2, 0],
			[-1.4142135623730954, 1.414213562373095, 0],
		],
		[
			[-1.0000000000000002, 1, -1.414213562373095],
			[-2.59786816870648e-16, 1.4142135623730951, -1.414213562373095],
			[-8.659560562354935e-17, 8.659560562354932e-17, -2],
		],
		[
			[-8.659560562354935e-17, 8.659560562354932e-17, 2],
			[-2.59786816870648e-16, 1.4142135623730951, 1.414213562373095],
			[-1.0000000000000002, 1, 1.414213562373095],
		],
		[
			[-3.6739403974420594e-16, 2, 0],
			[1.4142135623730947, 1.4142135623730954, 0],
			[0.9999999999999998, 1.0000000000000002, -1.414213562373095],
			[-2.59786816870648e-16, 1.4142135623730951, -1.414213562373095],
		],
		[
			[-2.59786816870648e-16, 1.4142135623730951, 1.414213562373095],
			[0.9999999999999998, 1.0000000000000002, 1.414213562373095],
			[1.4142135623730947, 1.4142135623730954, 0],
			[-3.6739403974420594e-16, 2, 0],
		],
		[
			[-2.59786816870648e-16, 1.4142135623730951, -1.414213562373095],
			[0.9999999999999998, 1.0000000000000002, -1.414213562373095],
			[-2.2496396739927864e-32, 1.2246467991473532e-16, -2],
		],
		[
			[-2.2496396739927864e-32, 1.2246467991473532e-16, 2],
			[0.9999999999999998, 1.0000000000000002, 1.414213562373095],
			[-2.59786816870648e-16, 1.4142135623730951, 1.414213562373095],
		],
		[
			[1.4142135623730947, 1.4142135623730954, 0],
			[2, 4.898587196589413e-16, 0],
			[1.4142135623730951, 3.4638242249419736e-16, -1.414213562373095],
			[0.9999999999999998, 1.0000000000000002, -1.414213562373095],
		],
		[
			[0.9999999999999998, 1.0000000000000002, 1.414213562373095],
			[1.4142135623730951, 3.4638242249419736e-16, 1.414213562373095],
			[2, 4.898587196589413e-16, 0],
			[1.4142135623730947, 1.4142135623730954, 0],
		],
		[
			[0.9999999999999998, 1.0000000000000002, -1.414213562373095],
			[1.4142135623730951, 3.4638242249419736e-16, -1.414213562373095],
			[8.65956056235493e-17, 8.659560562354935e-17, -2],
		],
		[
			[8.65956056235493e-17, 8.659560562354935e-17, 2],
			[1.4142135623730951, 3.4638242249419736e-16, 1.414213562373095],
			[0.9999999999999998, 1.0000000000000002, 1.414213562373095],
		],
	];
	//t.notThrows.skip(() => geom3.validate(result1));
	expect(() => geom3.validate(result1)).never.toThrow();
	expect(obs.size()).toBe(32);
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);

	// subtract of two non-overlapping objects
	const geometry2 = center({ relativeTo: [10, 10, 10] }, cuboid({ size: [4, 4, 4] })) as Geom3;

	const result2 = subtract(geometry1, geometry2) as Geom3;
	obs = geom3.toPoints(result2);
	//t.notThrows.skip(() => geom3.validate(result2));
	expect(() => geom3.validate(result2)).never.toThrow();
	expect(obs.size()).toBe(32);

	// subtract of two partially overlapping objects
	const geometry3 = cuboid({ size: [18, 18, 18] });
	const result3 = subtract(geometry2, geometry3) as Geom3;
	obs = geom3.toPoints(result3);
	exp = [
		[
			[12, 8, 8],
			[12, 12, 8],
			[12, 12, 12],
			[12, 8, 12],
		],
		[
			[8, 12, 8],
			[8, 12, 12],
			[12, 12, 12],
			[12, 12, 8],
		],
		[
			[8, 8, 12],
			[12, 8, 12],
			[12, 12, 12],
			[8, 12, 12],
		],
		[
			[9, 8, 8],
			[9, 8, 9],
			[9, 9, 9],
			[9, 9, 8],
		],
		[
			[8, 9, 8],
			[9, 9, 8],
			[9, 9, 9],
			[8, 9, 9],
		],
		[
			[8, 8, 9],
			[8, 9, 9],
			[9, 9, 9],
			[9, 8, 9],
		],
		[
			[8, 12, 12],
			[8, 12, 9],
			[8, 8, 9],
			[8, 8, 12],
		],
		[
			[8, 12, 9],
			[8, 12, 8],
			[8, 9, 8],
			[8, 9, 9],
		],
		[
			[8, 8, 12],
			[8, 8, 9],
			[12, 8, 9],
			[12, 8, 12],
		],
		[
			[9, 8, 9],
			[9, 8, 8],
			[12, 8, 8],
			[12, 8, 9],
		],
		[
			[12, 12, 8],
			[12, 9, 8],
			[8, 9, 8],
			[8, 12, 8],
		],
		[
			[12, 9, 8],
			[12, 8, 8],
			[9, 8, 8],
			[9, 9, 8],
		],
	];
	//t.notThrows.skip(() => geom3.validate(result3));
	expect(() => geom3.validate(result3)).never.toThrow();
	expect(obs.size()).toBe(12);
	expect(comparePolygonsAsPoints(obs, exp)).toBe(true);
	// subtract of two completely overlapping objects
	const result4 = subtract(geometry1, geometry3) as Geom3;
	obs = geom3.toPoints(result4);
	expect(() => geom3.validate(result4)).never.toThrow();
	expect(obs.size()).toBe(0);
});
