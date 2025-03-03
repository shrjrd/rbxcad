import type { Vec3 } from "../types";

export interface Line2 extends Vec3 {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
}
