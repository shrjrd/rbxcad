const BasePart = new Instance("Part");
BasePart.CanCollide = false;
BasePart.Anchored = true;

const VertexPart = BasePart.Clone();
VertexPart.Size = new Vector3(0.1, 0.1, 0.1);

const WedgePart = BasePart.Clone();
WedgePart.TopSurface = Enum.SurfaceType.Smooth;
WedgePart.BottomSurface = Enum.SurfaceType.Smooth;

const WedgeMesh = new Instance("SpecialMesh", WedgePart);
WedgeMesh.MeshType = Enum.MeshType.Wedge;
WedgeMesh.Scale = new Vector3(1, 1, 1);

function drawPoint3D(point: Vector3, parent: Instance) {
	const PointPart = VertexPart.Clone();
	PointPart.CFrame = new CFrame(point);
	PointPart.Parent = parent;
}

function drawLine3D(
	a: Vector3,
	b: Vector3,
	color: RGB = [math.random() * 0.25 + 0.25, math.random() * 0.25 + 0.25, math.random() * 0.25 + 0.25],
	//color: RGB = [0.5, 0.5, 0.5],
	parent: Instance,
) {
	const LinePart = BasePart.Clone();
	LinePart.Size = new Vector3(0.1, 0.1, a.sub(b).Magnitude);
	LinePart.Color = new Color3(color[0], color[1], color[2]);
	LinePart.CFrame = new CFrame(a.add(b).div(2), a);
	LinePart.Parent = parent;
}

function drawTriangle3D(
	a: Vector3,
	b: Vector3,
	c: Vector3,
	color: RGB | RGBA = [math.random() * 0.25 + 0.25, math.random() * 0.25 + 0.25, math.random() * 0.25 + 0.25],
	//color: RGB = [0.5, 0.5, 0.5],
	parent: Instance,
) {
	let ab = b.sub(a);
	let ac = c.sub(a);
	let bc = c.sub(b);
	const abd = ab.Dot(ab);
	const acd = ac.Dot(ac);
	const bcd = bc.Dot(bc);
	if (abd > acd && abd > bcd) {
		[c, a] = [a, c];
	} else if (acd > bcd && acd > abd) {
		[a, b] = [b, a];
	}
	ab = b.sub(a);
	ac = c.sub(a);
	bc = c.sub(b);
	const right = ac.Cross(ab).Unit;
	const up = bc.Cross(right).Unit;
	const back = bc.Unit;
	const height = math.abs(ab.Dot(up));
	const TriangleModel = new Instance("Model");
	TriangleModel.Name = "Triangle";
	const w1 = WedgePart.Clone();
	w1.Size = new Vector3(0, height, math.abs(ab.Dot(back)));
	w1.CFrame = CFrame.fromMatrix(a.add(b).div(2), right, up, back);
	w1.Color = new Color3(color[0], color[1], color[2]);
	w1.Parent = TriangleModel;
	const w2 = WedgePart.Clone();
	w2.Size = new Vector3(0, height, math.abs(ac.Dot(back)));
	w2.CFrame = CFrame.fromMatrix(a.add(c).div(2), right.mul(-1), up, back.mul(-1));
	w2.Color = new Color3(color[0], color[1], color[2]);
	w2.Parent = TriangleModel;
	TriangleModel.Parent = parent;
}

function drawNormal(a: Vector3, b: Vector3, c: Vector3, parent: Instance) {
	const normal = c.sub(a).Cross(b.sub(a)).Unit;
	const pos = a.add(b).add(c).div(3);
	drawLine3D(pos, pos.add(normal.mul(1)), undefined, parent);
}

function drawConvexPolygon3D(polygon: Poly3, color: RGB | RGBA, parent: Instance) {
	const vertices = polygon.vertices;
	for (let i = 2; i < vertices.size(); i++) {
		const _a = vertices[i - 1];
		const _b = vertices[0];
		const _c = vertices[i];
		//JSCAD uses x, z, y Roblox uses x, y, z
		const a = new Vector3(_a[0], _a[1], _a[2]);
		const b = new Vector3(_b[0], _b[1], _b[2]);
		const c = new Vector3(_c[0], _c[1], _c[2]);
		drawTriangle3D(a, b, c, color, parent);
		//drawNormal(a, b, c, parent);
	}
}

function drawConvexPolygons3D(polygons: Poly3[], color: RGB | RGBA, parent: Instance) {
	for (let i = 0; i < polygons.size(); i++) {
		const polygon = polygons[i];
		const PolygonModel = new Instance("Model");
		PolygonModel.Name = `Polygon${i}`;
		drawConvexPolygon3D(polygon, color, PolygonModel);
		PolygonModel.Parent = parent;
	}
}

function drawGeometry3D(geometry: Geom3, parent: Instance) {
	const GeometryModel = new Instance("Model");
	GeometryModel.Name = "Geometry";
	drawConvexPolygons3D(geometry.polygons, geometry.color!, GeometryModel);
	GeometryModel.Parent = parent;
}

function drawEdges(edges: [Vec2, Vec2][], color: RGB | RGBA, parent: Instance, z: number = 0) {
	for (let i = 0; i < edges.size(); i++) {
		const edge = edges[i];
		const [v1, v2] = [edge[0], edge[1]];
		drawLine3D(new Vector3(v1[0], v1[1], z), new Vector3(v2[0], v2[1], z), color, parent);
	}
}

function drawGeometry2D(geometry: Geom2, parent: Instance, z: number = 0) {
	const GeometryModel = new Instance("Model");
	GeometryModel.Name = "Geometry";
	drawEdges(geometry.sides, geometry.color!, GeometryModel, z);
	GeometryModel.Parent = parent;
}

function drawGeometries2D(geometries: Geom2[], parent: Instance, z: number = 0) {
	for (let i = 0; i < geometries.size(); i++) {
		const geometry = geometries[i];
		drawGeometry2D(geometry, parent, z);
	}
}

function drawGeometries3D(geometries: Geom3[], parent: Instance) {
	for (let i = 0; i < geometries.size(); i++) {
		const geometry = geometries[i];
		drawGeometry3D(geometry, parent);
	}
}

function drawPath2D(path: Path2, parent: Instance, z: number = 0) {
	const PathModel = new Instance("Model");
	PathModel.Name = "Path";
	for (let i = 0; i < path.points.size() - 1; i++) {
		const [v1, v2] = [path.points[i], path.points[i + 1]];
		drawLine3D(new Vector3(v1[0], v1[1], z), new Vector3(v2[0], v2[1], z), path.color!, PathModel);
	}
	PathModel.Parent = parent;
}

import applyTransformsGeom2 from "./modeling/src/geometries/geom2/applyTransforms";
import applyTransformsGeom3 from "./modeling/src/geometries/geom3/applyTransforms";
import applyTransformsPath2 from "./modeling/src/geometries/path2/applyTransforms";
function draw(
	parent: Instance,
	options: { applyTransforms?: boolean; z?: number } = { applyTransforms: false, z: 0 },
	...objects: object[]
) {
	const transform = options.applyTransforms;
	for (let i = 0; i < objects.size(); i++) {
		const object = objects[i] as Geom2 | Geom3 | Path2;
		if ("sides" in object) {
			drawGeometry2D(transform ? applyTransformsGeom2(object) : object, parent, options.z);
		} else if ("polygons" in object) {
			drawGeometry3D(transform ? applyTransformsGeom3(object) : object, parent);
		} else if ("points" in object) {
			drawPath2D(transform ? applyTransformsPath2(object) : object, parent, options.z);
		}
	}
}

const v1 = new Vector3(1, 1, -1); // top front right
const v2 = new Vector3(1, -1, -1); // bottom front right
const v3 = new Vector3(-1, -1, -1); // bottom front left
const v4 = new Vector3(-1, 1, -1); // top front left
const v5 = new Vector3(1, 1, 1); // top back right
const v6 = new Vector3(1, -1, 1); // bottom back right
const v7 = new Vector3(-1, -1, 1); // bottom back left
const v8 = new Vector3(-1, 1, 1); // top back left

// Roblox's Vector3 to JSCAD's Vec3
const Vector3ToVec3 = (vector: Vector3) => {
	return [vector.X, vector.Y, vector.Z] as Vec3;
};

function getGeometryFromPart(part: Part) {
	const PartShape = part.Shape;
	const PartSize = part.Size.mul(0.5);
	if (PartShape === Enum.PartType.Ball) {
		const PartSize = part.Size;
	}
	const PartCFrame = part.CFrame;
	if (PartShape === Enum.PartType.Block) {
		const c1 = Vector3ToVec3(PartCFrame.mul(new CFrame(PartSize.mul(v1))).Position);
		const c2 = Vector3ToVec3(PartCFrame.mul(new CFrame(PartSize.mul(v2))).Position);
		const c3 = Vector3ToVec3(PartCFrame.mul(new CFrame(PartSize.mul(v3))).Position);
		const c4 = Vector3ToVec3(PartCFrame.mul(new CFrame(PartSize.mul(v4))).Position);
		const c5 = Vector3ToVec3(PartCFrame.mul(new CFrame(PartSize.mul(v5))).Position);
		const c6 = Vector3ToVec3(PartCFrame.mul(new CFrame(PartSize.mul(v6))).Position);
		const c7 = Vector3ToVec3(PartCFrame.mul(new CFrame(PartSize.mul(v7))).Position);
		const c8 = Vector3ToVec3(PartCFrame.mul(new CFrame(PartSize.mul(v8))).Position);
		return {
			polygons: [
				{ vertices: [c1, c2, c3, c4] },
				{ vertices: [c8, c7, c6, c5] },
				{ vertices: [c5, c6, c2, c1] },
				{ vertices: [c6, c7, c3, c2] },
				{ vertices: [c7, c8, c4, c3] },
				{ vertices: [c8, c5, c1, c4] },
			],
			transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
		} as Geom3;
	} else if (PartShape === Enum.PartType.Wedge) {
		const c2 = Vector3ToVec3(PartCFrame.mul(new CFrame(PartSize.mul(v2))).Position);
		const c3 = Vector3ToVec3(PartCFrame.mul(new CFrame(PartSize.mul(v3))).Position);
		const c5 = Vector3ToVec3(PartCFrame.mul(new CFrame(PartSize.mul(v5))).Position);
		const c6 = Vector3ToVec3(PartCFrame.mul(new CFrame(PartSize.mul(v6))).Position);
		const c7 = Vector3ToVec3(PartCFrame.mul(new CFrame(PartSize.mul(v7))).Position);
		const c8 = Vector3ToVec3(PartCFrame.mul(new CFrame(PartSize.mul(v8))).Position);
		return {
			polygons: [
				{ vertices: [c2, c3, c8, c5] },
				{ vertices: [c7, c6, c5, c8] },
				{ vertices: [c6, c7, c3, c2] },
				{ vertices: [c3, c7, c8] },
				{ vertices: [c6, c2, c5] },
			],
			transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
		} as Geom3;
	} else if (PartShape === Enum.PartType.Cylinder) {
		return {
			polygons: [],
			transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
		} as Geom3;
	} else if (PartShape === Enum.PartType.CornerWedge) {
		return {
			polygons: [],
			transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
		} as Geom3;
	}
}

export {
	draw,
	drawConvexPolygon3D,
	drawConvexPolygons3D,
	drawGeometries2D,
	drawGeometries3D,
	drawGeometry2D,
	drawGeometry3D,
	drawLine3D,
	drawNormal,
	drawPath2D,
	drawPoint3D,
	drawTriangle3D,
	getGeometryFromPart,
};
