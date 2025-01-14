import mat4 from "./mat4";
import vec2 from "./vec2";
import vec3 from "./vec3";
/**
 * Class OrthoNormalBasis
 * Reprojects points on a 3D plane onto a 2D plane
 * or from a 2D plane back onto the 3D plane
 */
class OrthoNormalBasis {
	u: Vec3;
	v: Vec3;
	plane: _Plane;
	planeorigin: Vec3;

	constructor(plane: _Plane, rightvector?: Vec3) {
		if (!rightvector) {
			// choose an arbitrary right hand vector, making sure it is somewhat orthogonal to the plane normal:
			rightvector = vec3.orthogonal(vec3.create(), plane as Vec3);
		}
		this.v = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), plane as Vec3, rightvector));
		this.u = vec3.cross(vec3.create(), this.v, plane as Vec3);
		this.plane = plane;
		this.planeorigin = vec3.scale(vec3.create(), plane as Vec3, plane[3]);
	}

	getProjectionMatrix(): Mat4 {
		return mat4.fromValues(
			this.u[0],
			this.v[0],
			this.plane[0],
			0,
			this.u[1],
			this.v[1],
			this.plane[1],
			0,
			this.u[2],
			this.v[2],
			this.plane[2],
			0,
			0,
			0,
			-this.plane[3],
			1,
		);
	}

	getInverseProjectionMatrix(): Mat4 {
		const p = vec3.scale(vec3.create(), this.plane as Vec3, this.plane[3]);
		return mat4.fromValues(
			this.u[0],
			this.u[1],
			this.u[2],
			0,
			this.v[0],
			this.v[1],
			this.v[2],
			0,
			this.plane[0],
			this.plane[1],
			this.plane[2],
			0,
			p[0],
			p[1],
			p[2],
			1,
		);
	}

	to2D(point: Vec3): Vec2 {
		return vec2.fromValues(vec3.dot(point, this.u), vec3.dot(point, this.v));
	}

	to3D(point: Vec2): Vec3 {
		const v1 = vec3.scale(vec3.create(), this.u, point[0]);
		const v2 = vec3.scale(vec3.create(), this.v, point[1]);

		const v3 = vec3.add(v1, v1, this.planeorigin);
		const v4 = vec3.add(v2, v2, v3);
		return v4;
	}
}

export default OrthoNormalBasis;
