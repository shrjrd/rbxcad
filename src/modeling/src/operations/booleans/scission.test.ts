import { expect, test } from "@rbxts/jest-globals";

import { geom3 } from "../../geometries";
import { cube, torus } from "../../primitives";
import { scission, union } from "./index";

test("scission: scission of one or more geom3 objects produces expected geometry", () => {
	const geometry1 = geom3.create();
	const geometry2 = cube({ size: 5 });
	const geometry3 = cube({ size: 5, center: [5, 5, 5] });

	// scission of one object
	const result1 = scission(geometry1) as Geom3[];
	expect(result1.size()).toBe(0); // empty geometry, no pieces

	// scission of three objects
	const result2 = scission(geometry1, geometry2, geometry3) as Geom3[][];
	expect(result2.size()).toBe(3);
	expect(result2[0].size()).toBe(0);
	expect(result2[1].size()).toBe(1);
	expect(() => geom3.validate(result2[1][0])).never.toThrow();
	expect(result2[2].size()).toBe(1);
	expect(() => geom3.validate(result2[2][0])).never.toThrow();
});

test("scission: scission of complex geom3 produces expected geometry", () => {
	const geometry1 = torus({ outerRadius: 40, innerRadius: 5, outerSegments: 16, innerSegments: 16 });
	const geometry2 = torus({ outerRadius: 20, innerRadius: 5, outerSegments: 16, innerSegments: 16 });
	const geometry3 = union(geometry1, geometry2) as Geom3;

	const pc1 = geom3.toPolygons(geometry1).size();
	const pc2 = geom3.toPolygons(geometry2).size();
	const pc3 = geom3.toPolygons(geometry3).size();

	expect(pc1).toBe(512);
	expect(pc2).toBe(512);
	expect(pc3).toBe(512); // due to retessellate

	const result1 = scission(geometry3) as Geom3[];
	expect(result1.size()).toBe(2);
	//t.notThrows.skip(() => geom3.validate(result1[0]));
	expect(() => geom3.validate(result1[0])).never.toThrow();
	//t.notThrows.skip(() => geom3.validate(result1[1]));
	expect(() => geom3.validate(result1[1])).never.toThrow();
	const rc1 = geom3.toPolygons(result1[0]).size();
	const rc2 = geom3.toPolygons(result1[1]).size();

	expect(rc1).toBe(256);
	expect(rc2).toBe(256);
});
