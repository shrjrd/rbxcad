import { expect, test } from "@rbxts/jest-globals";

import { plane } from "../index";
import * as vec3 from "../vec3/index";
import { OrthonormalFormula } from "./OrthonormalFormula";

test("utils: OrthonormalFormula constructor", () => {
	const p1 = plane.fromNormalAndPoint(plane.create(), [5, 0, 0], [0, 0, 0]);
	const p2 = plane.fromNormalAndPoint(plane.create(), [0, 0, 5], [5, 5, 5]);

	const o1 = new OrthonormalFormula(p1);
	expect(o1.u).toEqual([0, -1, 0]);
	expect(o1.v).toEqual([0, 0, -1]);

	const o2 = new OrthonormalFormula(p2);
	expect(o2.u).toEqual([-1, 0, 0]);
	expect(o2.v).toEqual([0, -1, 0]);
});

test("utils: OrthonormalFormula methods", () => {
	const p1 = plane.fromNormalAndPoint(plane.create(), [5, 0, 0], [5, 0, 0]);
	const o1 = new OrthonormalFormula(p1);

	const v1 = vec3.fromValues(5, 0, 0);
	const v2 = vec3.fromValues(0, 5, 0);
	const v3 = vec3.fromValues(0, 0, 5);
	const v4 = vec3.fromValues(-5, 0, 0);
	const v5 = vec3.fromValues(0, -5, 0);
	const v6 = vec3.fromValues(0, 0, -5);

	const t1 = o1.to2D(v1);
	expect(t1).toEqual([0, 0]);
	const t2 = o1.to2D(v2);
	expect(t2).toEqual([-5, 0]);
	const t3 = o1.to2D(v3);
	expect(t3).toEqual([0, -5]);
	const t4 = o1.to2D(v4);
	expect(t4).toEqual([0, 0]);
	const t5 = o1.to2D(v5);
	expect(t5).toEqual([5, 0]);
	const t6 = o1.to2D(v6);
	expect(t3).toEqual([0, -5]);

	const r1 = o1.to3D(t1);
	expect(r1).toEqual(v1);
	const r2 = o1.to3D(t2);
	expect(r2).toEqual(v2);
	const r3 = o1.to3D(t3);
	expect(r3).toEqual(v3);
	const r4 = o1.to3D(t4);
	expect(r4).toEqual(v4);
	const r5 = o1.to3D(t5);
	expect(r5).toEqual(v5);
	const r6 = o1.to3D(t6);
	expect(r6).toEqual(v6);

	const m1 = o1.getProjectionMatrix();
	expect(m1).toEqual([0, 0, 1, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -5, 1]);
	const m2 = o1.getInverseProjectionMatrix();
	expect(m2).toEqual([0, -1, 0, 0, 0, 0, -1, 0, 1, 0, 0, 0, 5, 0, 0, 1]);
});
