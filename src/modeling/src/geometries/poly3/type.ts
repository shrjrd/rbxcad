import type { Vec3, Plane } from "../../maths/types";
import type { Color } from "../types";

export interface Poly3 {
	vertices: Array<Vec3>;
	color?: Color;

	// used internally for calculations
	plane?: Plane;
}
