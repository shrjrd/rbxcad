import cross from "../../../maths/vec3/cross";
import squaredLength from "../../../maths/vec3/squaredLength";
import subtract from "../../../maths/vec3/subtract";

/*
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
	const ab = [0, 0, 0] as Vec3;
	const ap = [0, 0, 0] as Vec3;
	const cr = [0, 0, 0] as Vec3;
	subtract(ab, b, a);
	subtract(ap, p, a);
	const area = squaredLength(cross(cr, ap, ab));
	const s = squaredLength(ab);
	if (s === 0) {
		throw error("a and b are the same point");
	}
	return area / s;
};

const pointLineDistance = (point: Vec3, a: Vec3, b: Vec3) => math.sqrt(distanceSquared(point, a, b));

export default pointLineDistance;
