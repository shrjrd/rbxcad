import type { Vec3 } from "../types";
export interface Line3 extends Array<Vec3> {
	[index: number]: Vec3;
	0: Vec3;
	1: Vec3;
}
