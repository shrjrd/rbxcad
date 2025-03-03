import type { Poly3 } from "./type";
import * as mplane from "../../maths/plane/index";

export const plane = (polygon: Poly3) => {
	if (!polygon.plane) {
		polygon.plane = mplane.fromPoints(mplane.create(), ...polygon.vertices);
	}
	return polygon.plane!;
};
