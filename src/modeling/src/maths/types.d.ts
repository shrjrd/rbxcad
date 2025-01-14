/*export { default as Line2 } from './line2/type'
export { default as Line3 } from './line3/type'
export { default as Mat4 } from './mat4/type'
export { default as Plane } from './plane/type'
export { default as Vec1 } from './vec1/type'
export { default as Vec2 } from './vec2/type'
export { default as Vec3 } from './vec3/type'
export { default as Vec4 } from './vec4/type'
*/

interface Line2 extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
}

interface Line3 extends Array<Vec3> {
	[index: number]: Vec3;
	0: Vec3;
	1: Vec3;
}

interface Mat4 extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
	3: number;
	4: number;
	5: number;
	6: number;
	7: number;
	8: number;
	9: number;
	10: number;
	11: number;
	12: number;
	13: number;
	14: number;
	15: number;
}

interface Vec1 extends Array<number> {
	[index: number]: number;
	0: number;
}

interface Vec2 extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
}

interface Vec3 extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
}

interface Vec4 extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
	3: number;
}

type _Plane = Vec4; // Plane is already used by rbx-ts...
