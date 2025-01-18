import { expect, test } from "@rbxts/jest-globals";

import { geom2, geom3 } from "../../geometries";
import { hullChain } from "./index";

test("hullChain (two, geom2)", () => {
	const geometry1 = geom2.fromPoints([
		[6, 6],
		[3, 6],
		[3, 3],
		[6, 3],
	]);
	const geometry2 = geom2.fromPoints([
		[-6, -6],
		[-9, -6],
		[-9, -9],
		[-6, -9],
	]);

	// same
	let obs = hullChain(geometry1, geometry1) as Geom2;
	let pts = geom2.toPoints(obs);

	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(4);

	// different
	obs = hullChain(geometry1, geometry2) as Geom2;
	pts = geom2.toPoints(obs);

	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(6);
});

test("hullChain (three, geom2)", () => {
	const geometry1 = geom2.fromPoints([
		[6, 6],
		[3, 6],
		[3, 3],
		[6, 3],
	]);
	const geometry2 = geom2.fromPoints([
		[-6, -6],
		[-9, -6],
		[-9, -9],
		[-6, -9],
	]);
	const geometry3 = geom2.fromPoints([
		[-6, 6],
		[-3, 6],
		[-3, 9],
		[-6, 9],
	]);

	// open
	let obs = hullChain(geometry1, geometry2, geometry3) as Geom2;
	let pts = geom2.toPoints(obs);

	// the sides change based on the bestplane chosen in trees/Node.js
	expect(() => geom2.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(10);

	// closed
	obs = hullChain(geometry1, geometry2, geometry3, geometry1) as Geom2;
	pts = geom2.toPoints(obs);

	// the sides change based on the bestplane chosen in trees/Node.js
	expect(() => geom2.validate(obs)).never.toThrow();
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
	expect(pts.size()).toBe(23);

	// closed
	obs = hullChain(geometry1, geometry2, geometry3, geometry1) as Geom3;
	pts = geom3.toPoints(obs);

	//t.notThrows.skip(() => geom3.validate(obs));
	//expect(() => geom3.validate(obs)).never.toThrow();
	expect(pts.size()).toBe(28);
});
