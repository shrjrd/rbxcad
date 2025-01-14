import QuickHull from "./QuickHull";

/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

const runner = (points: Vec3[], options: { skipTriangulation: boolean }) => {
	const instance = new QuickHull(points);
	instance.build();
	return instance.collectFaces(options.skipTriangulation);
};

export default runner;
