import type { Vec3 } from "../../../maths/types";
import { cross, squaredLength, subtract } from "../../../maths/vec3/index";

/**
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

const distanceSquared = (p: Vec3, a: Vec3, b: Vec3) => {
	// == parallelogram solution
	//
	//            s
	//      __a________b__
	//       /   |    /
	//      /   h|   /
	//     /_____|__/
	//    p
	//
	//  s = b - a
	//  area = s * h
	//  |ap x s| = s * h
	//  h = |ap x s| / s
	//
	const ab: Vec3 = [0, 0, 0];
	const ap: Vec3 = [0, 0, 0];
	const cr: Vec3 = [0, 0, 0];
	subtract(ab, b, a);
	subtract(ap, p, a);
	const area = squaredLength(cross(cr, ap, ab));
	const s = squaredLength(ab);
	if (s === 0) {
		throw "a and b are the same point";
	}
	return area / s;
};

export const pointLineDistance = (point: Vec3, a: Vec3, b: Vec3) => math.sqrt(distanceSquared(point, a, b));
