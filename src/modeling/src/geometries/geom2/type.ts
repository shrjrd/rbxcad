import type { Color } from "../types";
import type { Mat4, Vec2 } from "../../maths/types";

export interface Geom2 {
	outlines: Array<Array<Vec2>>;
	transforms: Mat4;
	color?: Color;
}
