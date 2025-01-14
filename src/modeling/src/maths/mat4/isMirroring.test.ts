import { expect, test } from "@rbxts/jest-globals";

import plane from "../plane";
import { create, fromScaling, isMirroring, mirrorByPlane, rotate, scale, translate } from "./index";

test("mat4: isMirroring() should determine correctly", () => {
	let matrix = create();
	expect(isMirroring(matrix)).toBe(false);

	matrix = fromScaling(create(), [2, 4, 6]);
	expect(isMirroring(matrix)).toBe(false);

	const planeX = plane.fromPoints(plane.create(), [0, 0, 0], [0, 1, 1], [0, 1, 0]);
	const planeY = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [1, 0, 1]);
	const planeZ = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [1, 1, 0]);

	matrix = mirrorByPlane(create(), planeX);
	expect(isMirroring(matrix)).toBe(true);

	matrix = mirrorByPlane(create(), planeY);
	expect(isMirroring(matrix)).toBe(true);

	matrix = mirrorByPlane(create(), planeZ);
	expect(isMirroring(matrix)).toBe(true);

	// additional transforms
	const rotation = 90 * 0.017453292519943295;
	matrix = rotate(matrix, matrix, rotation, [0, 0, 1]);
	expect(isMirroring(matrix)).toBe(true);

	matrix = scale(matrix, matrix, [0.5, 2, 5]);
	expect(isMirroring(matrix)).toBe(true);

	matrix = translate(matrix, matrix, [2, -3, 600]);
	expect(isMirroring(matrix)).toBe(true);
});
