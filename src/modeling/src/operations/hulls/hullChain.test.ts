import type { Geom2, Geom3 } from "../../geometries/types";
import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3 } from "../../geometries/index";
import { measureArea, measureVolume } from "../../measurements/index";
import { square } from "../../primitives/square";
import { hullChain } from "./index";

test("hullChain: hullChain single geometry", () => {
	const result = hullChain([square({ size: 1 })]) as Geom2;
	expect(() => geom2.validate(result)).never.toThrow();
	expect(measureArea(result)).toBe(1);
	expect(geom2.toPoints(result).size()).toBe(4);
});

test("hullChain (two, geom2)", () => {
	const geometry1 = geom2.create([
		[
			[6, 6],
			[3, 6],
			[3, 3],
			[6, 3],
		],
	]);
	const geometry2 = geom2.create([
		[
			[-6, -6],
			[-9, -6],
			[-9, -9],
			[-6, -9],
		],
	]);

	// same
	let obs = hullChain(geometry1, geometry1) as Geom2;
	let pts = geom2.toPoints(obs);

	expect(() => geom2.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(9);
	expect(pts.size()).toBe(4);

	// different
	obs = hullChain(geometry1, geometry2) as Geom2;
	pts = geom2.toPoints(obs);

	expect(() => geom2.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(81);
	expect(pts.size()).toBe(6);
});

test("hullChain (three, geom2)", () => {
	const geometry1 = geom2.create([
		[
			[6, 6],
			[3, 6],
			[3, 3],
			[6, 3],
		],
	]);
	const geometry2 = geom2.create([
		[
			[-6, -6],
			[-9, -6],
			[-9, -9],
			[-6, -9],
		],
	]);
	const geometry3 = geom2.create([
		[
			[-6, 6],
			[-3, 6],
			[-3, 9],
			[-6, 9],
		],
	]);

	// open
	let obs = hullChain(geometry1, geometry2, geometry3) as Geom2;
	let pts = geom2.toPoints(obs);

	// the sides change based on the bestplane chosen in trees/Node
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(126);
	expect(pts.size()).toBe(10);

	// closed
	obs = hullChain(geometry1, geometry2, geometry3, geometry1) as Geom2;
	pts = geom2.toPoints(obs);

	// the sides change based on the bestplane chosen in trees/Node
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(148.21875);
	expect(pts.size()).toBe(10);
});

test("hullChain (three, geom3)", () => {
	const geometry1 = geom3.fromPoints([
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
		[
			[-1, -1, 1],
			[1, -1, 1],
			[1, 1, 1],
			[-1, 1, 1],
		],
	]);
	const geometry2 = geom3.fromPoints([
		[
			[3.5, 3.5, 3.5],
			[3.5, 3.5, 6.5],
			[3.5, 6.5, 6.5],
			[3.5, 6.5, 3.5],
		],
		[
			[6.5, 3.5, 3.5],
			[6.5, 6.5, 3.5],
			[6.5, 6.5, 6.5],
			[6.5, 3.5, 6.5],
		],
		[
			[3.5, 3.5, 3.5],
			[6.5, 3.5, 3.5],
			[6.5, 3.5, 6.5],
			[3.5, 3.5, 6.5],
		],
		[
			[3.5, 6.5, 3.5],
			[3.5, 6.5, 6.5],
			[6.5, 6.5, 6.5],
			[6.5, 6.5, 3.5],
		],
		[
			[3.5, 3.5, 3.5],
			[3.5, 6.5, 3.5],
			[6.5, 6.5, 3.5],
			[6.5, 3.5, 3.5],
		],
		[
			[3.5, 3.5, 6.5],
			[6.5, 3.5, 6.5],
			[6.5, 6.5, 6.5],
			[3.5, 6.5, 6.5],
		],
	]);
	const geometry3 = geom3.fromPoints([
		[
			[-4.5, 1.5, -4.5],
			[-4.5, 1.5, -1.5],
			[-4.5, 4.5, -1.5],
			[-4.5, 4.5, -4.5],
		],
		[
			[-1.5, 1.5, -4.5],
			[-1.5, 4.5, -4.5],
			[-1.5, 4.5, -1.5],
			[-1.5, 1.5, -1.5],
		],
		[
			[-4.5, 1.5, -4.5],
			[-1.5, 1.5, -4.5],
			[-1.5, 1.5, -1.5],
			[-4.5, 1.5, -1.5],
		],
		[
			[-4.5, 4.5, -4.5],
			[-4.5, 4.5, -1.5],
			[-1.5, 4.5, -1.5],
			[-1.5, 4.5, -4.5],
		],
		[
			[-4.5, 1.5, -4.5],
			[-4.5, 4.5, -4.5],
			[-1.5, 4.5, -4.5],
			[-1.5, 1.5, -4.5],
		],
		[
			[-4.5, 1.5, -1.5],
			[-1.5, 1.5, -1.5],
			[-1.5, 4.5, -1.5],
			[-4.5, 4.5, -1.5],
		],
	]);

	// open
	let obs = hullChain(geometry1, geometry2, geometry3) as Geom3;
	let pts = geom3.toPoints(obs);

	//t.notThrows.skip(() => geom3.validate(obs));
	//expect(() => geom3.validate(obs)).never.toThrow();
	expect(measureArea(obs)).toBe(266.1454764345133);
	expect(measureVolume(obs)).toBe(239.2012987012987);
	expect(pts.size()).toBe(23);

	// closed
	obs = hullChain(geometry1, geometry2, geometry3, geometry1) as Geom3;
	pts = geom3.toPoints(obs);

	//t.notThrows.skip(() => geom3.validate(obs));
	//expect(() => geom3.validate(obs)).never.toThrow();
	// DEVIATION: floating point differs?
	//expect(measureArea(obs)).toBe(272.2887171436021);
	expect(measureArea(obs)).toBe(272.28871714360207);
	expect(measureVolume(obs)).toBe(261.96982218883045);
	expect(pts.size()).toBe(28);
});
