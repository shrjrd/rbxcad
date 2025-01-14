import { expect, test } from "@rbxts/jest-globals";

import { fromPointsConvex, validate } from "./index";

test("fromPointsConvex (uniquePoints)", () => {
	const out: Vec3[] = [];
	for (let x = -9; x <= 9; ++x) {
		for (let y = -9; y <= 9; ++y) {
			for (let z = -9; z <= 9; ++z) {
				if (x * x + y * y + z * z <= 96) out.push([x, y, z]);
			}
		}
	}

	const obs = fromPointsConvex(out);
	validate(obs);

	expect(obs.polygons.size()).toBe(170);
	expect(obs.polygons.every((f: Poly3) => [3, 4, 8, 9].indexOf(f.vertices.size()) !== -1)).toBe(true);

	const c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	obs.polygons.forEach((f: Poly3) => c[f.vertices.size()]++);
	expect(c[3]).toBe(120);
	expect(c[4]).toBe(24);
	expect(c[8]).toBe(18);
	expect(c[9]).toBe(8);

	let edges2 = 336 * 2;
	obs.polygons.forEach((f: Poly3) => (edges2 -= f.vertices.size()));
	expect(edges2).toBe(0);
});
