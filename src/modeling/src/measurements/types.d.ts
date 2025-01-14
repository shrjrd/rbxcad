//import Vec3 from '../maths/vec3/type'
//export type BoundingBox = [Vec3, Vec3]

interface BoundingBox extends Array<Vec3 | Vec2> {
	0: Vec3;
	1: Vec3;
}
