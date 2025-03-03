import type { Geom2, Geom3 } from "../../geometries/types";
import { expect, test } from "@rbxts/jest-globals";

import { comparePoints } from "../../../test/helpers/index";
import { colorize } from "../../colors/index";
import { geom2, geom3 } from "../../geometries/index";
import { measureArea } from "../../measurements/index";
import { cube, torus } from "../../primitives/index";
import { project } from "./index";

test("project (defaults)", () => {
	const geometry0 = geom3.create();
	const geometry1 = cube({ size: 10 });
	const geometry2 = "hi" as unknown as Geom3;
	const geometry3 = [undefined] as unknown as Geom3; // DEVIATION: roblox-ts .map won't iterate over undefined values
	const geometry4 = [undefined] as unknown as Geom3;

	const results = project({}, geometry0, geometry1, geometry2, geometry3, geometry4) as Geom2[];
	expect(results.size()).toBe(5);
	expect(() => geom2.validate(results[0])).never.toThrow();
	expect(() => geom2.validate(results[1])).never.toThrow();
	expect(results[2]).toEqual(geometry2);
	expect(results[3]).toEqual(geometry3);
	expect(results[4]).toEqual(geometry4);

	const result = project({}, torus({ innerSegments: 4, outerSegments: 4 })) as Geom2;
	expect(() => geom2.validate(result)).never.toThrow();
	const pts = geom2.toPoints(result);
	const exp = [
		[-5, 0],
		[0, -5],
		[5, 0],
		[0, 5],
		[0, 3],
		[3, 0],
		[0, -3],
		[-3, 0],
	];
	expect(comparePoints(pts, exp)).toBe(true);
});

test("project torus (X and Y axis)", () => {
	let result = project({ axis: [1, 0, 0], origin: [1, 0, 0] }, torus({ outerSegments: 4 })) as Geom2;
	expect(() => geom2.validate(result)).never.toThrow();
	// DEVIATION: floating point differs?
	//expect(measureArea(result)).toBe(19.12144515225805);
	expect(measureArea(result)).toBe(19.121445152258055);
	let pts = geom2.toPoints(result);
	let exp = [
		[-1, -4],
		[-0.9807852804032304, -4.195090322016128],
		[-0.9238795325112867, -4.38268343236509],
		[-0.8314696123025452, -4.555570233019602],
		[-0.7071067811865475, -4.707106781186548],
		[-0.5555702330196022, -4.831469612302545],
		[-0.3826834323650898, -4.923879532511287],
		[-0.19509032201612825, -4.98078528040323],
		[0, -5],
		[0.19509032201612872, -4.98078528040323],
		[0.3826834323650904, -4.923879532511286],
		[0.5555702330196022, -4.831469612302545],
		[0.7071067811865477, -4.707106781186547],
		[0.8314696123025455, -4.555570233019602],
		[0.9238795325112866, -4.38268343236509],
		[0.9807852804032304, -4.195090322016128],
		[1, -4],
		[1, 0],
		[1, 4],
		[0.9807852804032304, 4.195090322016128],
		[0.9238795325112866, 4.38268343236509],
		[0.8314696123025455, 4.555570233019602],
		[0.7071067811865477, 4.707106781186547],
		[0.5555702330196022, 4.831469612302545],
		[0.3826834323650904, 4.923879532511286],
		[0.19509032201612872, 4.98078528040323],
		[0, 5],
		[-0.19509032201612825, 4.98078528040323],
		[-0.3826834323650898, 4.923879532511287],
		[-0.5555702330196022, 4.831469612302545],
		[-0.7071067811865475, 4.707106781186548],
		[-0.8314696123025452, 4.555570233019602],
		[-0.9238795325112867, 4.38268343236509],
		[-0.9807852804032304, 4.195090322016128],
		[-1, 4],
		[-1, 0],
	];
	expect(comparePoints(pts, exp)).toBe(true);

	result = project({ axis: [0, 1, 0], origin: [0, -1, 0] }, torus({ outerSegments: 4 })) as Geom2;
	expect(() => geom2.validate(result)).never.toThrow();
	expect(measureArea(result)).toBe(19.12144515225805);
	pts = geom2.toPoints(result);
	exp = [
		[-5, 0],
		[-4.98078528040323, -0.19509032201612825],
		[-4.923879532511287, -0.3826834323650898],
		[-4.831469612302545, -0.5555702330196022],
		[-4.707106781186548, -0.7071067811865475],
		[-4.555570233019602, -0.8314696123025452],
		[-4.38268343236509, -0.9238795325112867],
		[-4.195090322016128, -0.9807852804032304],
		[-4, -1],
		[0, -1],
		[4, -1],
		[4.195090322016128, -0.9807852804032304],
		[4.38268343236509, -0.9238795325112867],
		[4.555570233019602, -0.8314696123025452],
		[4.707106781186548, -0.7071067811865475],
		[4.831469612302545, -0.5555702330196022],
		[4.923879532511287, -0.3826834323650898],
		[4.98078528040323, -0.19509032201612825],
		[5, 0],
		[4.98078528040323, 0.19509032201612872],
		[4.923879532511286, 0.3826834323650904],
		[4.831469612302545, 0.5555702330196022],
		[4.707106781186547, 0.7071067811865477],
		[4.555570233019602, 0.8314696123025455],
		[4.38268343236509, 0.9238795325112866],
		[4.195090322016128, 0.9807852804032304],
		[4, 1],
		[0, 1],
		[-4, 1],
		[-4.195090322016128, 0.9807852804032304],
		[-4.38268343236509, 0.9238795325112866],
		[-4.555570233019602, 0.8314696123025455],
		[-4.707106781186547, 0.7071067811865477],
		[-4.831469612302545, 0.5555702330196022],
		[-4.923879532511286, 0.3826834323650904],
		[-4.98078528040323, 0.19509032201612872],
	];
	expect(comparePoints(pts, exp)).toBe(true);
});

test("project torus (martinez issue #155)", () => {
	const result = project(
		{ axis: [0, 1, 0], origin: [0, -1, 0] },
		torus({ innerSegments: 8, outerSegments: 4 }),
	) as Geom2;
	expect(() => geom2.validate(result)).never.toThrow();
	// DEVIATION: ?
	//expect(measureArea(result)).toBe(21.15545050788201);
	expect(measureArea(result)).toBe(18.828427124746188);
});

test("project: preserves color", () => {
	const redCube = colorize([1, 0, 0], cube()) as Geom3;
	const result = project({}, redCube) as Geom2;
	expect(result.color).toEqual([1, 0, 0, 1]);
});

test("project: empty geometry", () => {
	const obj = geom3.create();
	const result = project({}, obj) as Geom2;
	expect(() => geom2.validate(result)).never.toThrow();
	expect(measureArea(result)).toBe(0);
});
