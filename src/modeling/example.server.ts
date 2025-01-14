import { Workspace } from "@rbxts/services";

const BasePart = new Instance("Part");
BasePart.BrickColor = new BrickColor("Bright green");
BasePart.CanCollide = false;
BasePart.Anchored = true;

const VertexPart = BasePart.Clone();
VertexPart.Size = new Vector3(0.02, 0.02, 0.02);

const WedgePart = BasePart.Clone();
WedgePart.TopSurface = Enum.SurfaceType.Smooth;
WedgePart.BottomSurface = Enum.SurfaceType.Smooth;

const WedgeMesh = new Instance("SpecialMesh", WedgePart);
WedgeMesh.MeshType = Enum.MeshType.Wedge;
WedgeMesh.Scale = new Vector3(0, 1, 1);

function drawPoint3D(point: Vector3, parent: Instance) {
	const PointPart = VertexPart.Clone();
	PointPart.CFrame = new CFrame(point);
	PointPart.Parent = parent;
}

function drawLine3D(a: Vector3, b: Vector3, parent: Instance) {
	const LinePart = BasePart.Clone();
	LinePart.Size = new Vector3(0.02, 0.02, a.sub(b).Magnitude);
	LinePart.CFrame = new CFrame(a.add(b).div(2), a);
	LinePart.Parent = parent;
}

function drawTriangle3D(a: Vector3, b: Vector3, c: Vector3, parent: Instance) {
	let ab = b.sub(a);
	let ac = c.sub(a);
	let bc = c.sub(b);
	const abd = ab.Dot(ab);
	const acd = ac.Dot(ac);
	const bcd = bc.Dot(bc);
	if (abd > acd && abd > bcd) {
		[c, a] = [a, c];
	} else if (acd > bcd && acd > abd) {
		[b, a] = [a, b];
	}
	ab = b.sub(a);
	ac = c.sub(a);
	bc = c.sub(b);
	const right = ac.Cross(ab).Unit;
	const up = bc.Cross(right).Unit;
	const back = bc.Unit;
	const height = math.abs(ab.Dot(up));
	const w1 = WedgePart.Clone();
	w1.Size = new Vector3(0, height, math.abs(ab.Dot(back)));
	w1.CFrame = CFrame.fromMatrix(a.add(b).div(2), right, up, back);
	const w2 = WedgePart.Clone();
	w2.Size = new Vector3(0, height, math.abs(ac.Dot(back)));
	w2.CFrame = CFrame.fromMatrix(a.add(c).div(2), right.mul(-1), up, back.mul(-1));
	const TriangleModel = new Instance("Model");
	TriangleModel.Name = "Triangle";
	w1.Parent = TriangleModel;
	w2.Parent = TriangleModel;
	TriangleModel.Parent = parent;
}

function drawNormal(a: Vector3, b: Vector3, c: Vector3, parent: Instance) {
	const normal = c.sub(a).Cross(b.sub(a)).Unit;
	const pos = a.add(b).add(c).div(3);
	drawLine3D(pos, pos.add(normal.mul(0.25)), parent);
}

function drawConvexPolygon3D(polygon: Poly3, parent: Instance) {
	const vertices = polygon.vertices;
	for (let i = 2; i < vertices.size(); i++) {
		const _a = vertices[0];
		const _b = vertices[i - 1];
		const _c = vertices[i];
		//JSCAD uses x, z, y Roblox uses x, y, z
		const a = new Vector3(_a[0], _a[2], _a[1]);
		const b = new Vector3(_b[0], _b[2], _b[1]);
		const c = new Vector3(_c[0], _c[2], _c[1]);
		drawTriangle3D(a, b, c, parent);
		drawNormal(a, b, c, parent);
	}
}

function drawConvexPolygons3D(polygons: Poly3[], parent: Instance) {
	for (const polygon of polygons) {
		const PolygonModel = new Instance("Model");
		PolygonModel.Name = "Polygon";
		drawConvexPolygon3D(polygon, PolygonModel);
		PolygonModel.Parent = parent;
	}
}

function drawGeometry3D(geometry: Geom3, parent: Instance) {
	const GeometryModel = new Instance("Model");
	GeometryModel.Name = "Geometry";
	drawConvexPolygons3D(geometry.polygons, GeometryModel);
	GeometryModel.Parent = parent;
}

import { subtract } from "./src/operations/booleans";
import primitives from "./src/primitives";
{
	const geom1 = primitives.cube();
	const geom2 = primitives.cylinder();
	const geom3 = subtract(geom1, geom2) as Geom3;
	drawGeometry3D(geom3, Workspace);
}
{
	const geom1 = primitives.torus();
	drawGeometry3D(geom1, Workspace);
}
