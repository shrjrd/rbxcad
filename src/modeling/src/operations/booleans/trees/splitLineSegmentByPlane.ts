import type { Vec3, Plane } from "../../../maths/types";
import { Number } from "@rbxts/luau-polyfill";

import * as vec3 from "../../../maths/vec3/index";

export const splitLineSegmentByPlane = (plane: Plane, p1: Vec3, p2: Vec3) => {
	const direction = vec3.subtract(vec3.create(), p2, p1);
	let lambda = (plane[3] - vec3.dot(plane, p1)) / vec3.dot(plane, direction);
	if (Number.isNaN(lambda)) lambda = 0;
	if (lambda > 1) lambda = 1;
	if (lambda < 0) lambda = 0;

	vec3.scale(direction, direction, lambda);
	vec3.add(direction, p1, direction);
	return direction;
};
