import type { Vec3 } from "../../../maths/types";
import { QuickHull } from "./QuickHull";

/**
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

export const runner = (points: Vec3[], options = { skipTriangulation: false }) => {
	const instance = new QuickHull(points);
	instance.build();
	return instance.collectFaces(options.skipTriangulation);
};
