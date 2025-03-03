import type { Color, Poly3 } from "../types";
import type { Mat4 } from "../../maths/types";

export interface Geom3 {
	polygons: Array<Poly3>;
	transforms: Mat4;
	color?: Color;

	// used internally
	isRetesselated?: boolean;
}
