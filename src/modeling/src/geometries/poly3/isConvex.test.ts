import type { Vec3 } from "../../maths/types";
import { expect, test } from "@rbxts/jest-globals";

import { create, isConvex } from "./index";

test("poly3: isConvex() should return correct values", () => {
	const ply1 = create();
	expect(isConvex(ply1)).toBe(true);

	const ply2 = create([
		[1, 1, 0],
		[1, 0, 0],
		[0, 0, 0],
	]);
	expect(isConvex(ply2)).toBe(true);

	const vertices2ccw: Vec3[] = [
		[0, 0, 3],
		[10, 10, 3],
		[0, 5, 3],
	];
	const ply3 = create(vertices2ccw);
	expect(isConvex(ply3)).toBe(true);

	const vertices2cw: Vec3[] = [
		[0, 0, 3],
		[-10, 10, 3],
		[0, 5, 3],
	];
	const ply4 = create(vertices2cw);
	expect(isConvex(ply4)).toBe(true);

	// V-shape
	const verticesV: Vec3[] = [
		[0, 0, 3],
		[-10, 10, 3],
		[0, 5, 3],
		[10, 10, 3],
	];
	const ply5 = create(verticesV);
	expect(isConvex(ply5)).toBe(false);
});
