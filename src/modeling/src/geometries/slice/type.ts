import type { Vec3 } from "../../maths/types";
import type { Color } from "../types";

export interface Slice {
	contours: Array<Array<Vec3>>;
	color?: Color;
}
