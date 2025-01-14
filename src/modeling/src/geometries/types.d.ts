type Geometry = Geom2 | Geom3 | Path2 | Poly3;
type Color = RGB | RGBA;
type Colored = Geometry & { color: Color };
interface Poly2 {
	vertices: Vec2[];
}
interface Path2 {
	points: Vec2[];
	isClosed: boolean;
	transforms: Mat4;
	color?: Color;
	shared?: unknown[];
	lastBezierControlPoint?: Vec2;
}
interface Geom3 {
	polygons: Poly3[];
	transforms: Mat4;
	color?: Color;
	shared?: unknown[];
	isRetesselated?: boolean;
}
interface Geom2 {
	sides: [Vec2, Vec2][];
	transforms: Mat4;
	color?: Color;
	shared?: unknown[];
	isCanonicalized?: boolean;
}
interface Poly3 {
	vertices: Vec3[];
	color?: Color;
	plane?: _Plane;
	shared?: unknown[];
}
