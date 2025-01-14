import cross from "../../../maths/vec3/cross";
import normalize from "../../../maths/vec3/normalize";
import subtract from "../../../maths/vec3/subtract";

/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

const planeNormal = (out: Vec3, point1: Vec3, point2: Vec3, point3: Vec3) => {
	const tmp = [0, 0, 0] as Vec3;
	subtract(out, point1, point2);
	subtract(tmp, point2, point3);
	cross(out, out, tmp);
	return normalize(out, out);
};

export default planeNormal;
