import { expect, test } from "@rbxts/jest-globals";

import mat4 from "../../maths/mat4";
import { create, fromPoints, measureBoundingSphere, transform } from "./index";

test("poly3: measureBoundingSphere() should return correct values", () => {
	let ply1 = create();
	let exp1 = [0, 0, 0, 0];
	let ret1 = measureBoundingSphere(ply1);
	expect(ret1).toEqual(exp1);

	// simple triangle
	let ply2 = fromPoints([
		[0, 0, 0],
		[0, 10, 0],
		[0, 10, 10],
	]);
	let exp2 = [0, 5, 5, 7.0710678118654755];
	let ret2 = measureBoundingSphere(ply2);
	expect(ret2).toEqual(exp2);

	// simple square
	let ply3 = fromPoints([
		[0, 0, 0],
		[0, 10, 0],
		[0, 10, 10],
		[0, 0, 10],
	]);
	let exp3 = [0, 5, 5, 7.0710678118654755];
	let ret3 = measureBoundingSphere(ply3);
	expect(ret3).toEqual(exp3);

	// V-shape
	const points = [
		[0, 3, 0],
		[0, 5, 0],
		[0, 8, 2],
		[0, 6, 5],
		[0, 8, 6],
		[0, 5, 6],
		[0, 5, 2],
		[0, 2, 5],
		[0, 1, 3],
		[0, 3, 3],
	];
	let ply4 = fromPoints(points);
	let exp4 = [0, 4.5, 3, 4.6097722286464435];
	let ret4 = measureBoundingSphere(ply4);
	expect(ret4).toEqual(exp4);

	// rotated to various angles
	const rotation = mat4.fromZRotation(mat4.create(), 45 * 0.017453292519943295);
	ply1 = transform(rotation, ply1);
	ply2 = transform(rotation, ply2);
	ply3 = transform(rotation, ply3);
	ply4 = transform(rotation, ply4);
	ret1 = measureBoundingSphere(ply1);
	ret2 = measureBoundingSphere(ply2);
	ret3 = measureBoundingSphere(ply3);
	ret4 = measureBoundingSphere(ply4);
	exp1 = [0, 0, 0, 0];
	expect(ret1).toEqual(exp1);
	// DEVIATION: differentfloating point precision
	exp2 = [-3.5355339059327378, 3.5355339059327378, 5, 7.0710678118654755]; //-3.5355339059327373
	expect(ret2).toEqual(exp2);
	exp3 = [-3.5355339059327378, 3.5355339059327378, 5, 7.0710678118654755];
	expect(ret3).toEqual(exp3);
	exp4 = [-3.1819805153394642, 3.1819805153394642, 3, 4.6097722286464435]; //-3.181980515339464
	expect(ret4).toEqual(exp4);
});
