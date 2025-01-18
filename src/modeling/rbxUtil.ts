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

function drawTriangle3D(a: Vector3, b: Vector3, c: Vector3, color: RGB | RGBA, parent: Instance) {
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
	const normal = b.sub(a).Cross(c.sub(a)).Unit;
	const pos = a.add(b).add(c).div(3);
	drawLine3D(pos, pos.add(normal.mul(0.25)), parent);
}

function drawConvexPolygon3D(polygon: Poly3, color: RGB | RGBA, parent: Instance) {
	const vertices = polygon.vertices;
	for (let i = 2; i < vertices.size(); i++) {
		const _a = vertices[i - 1];
		const _b = vertices[0];
		const _c = vertices[i];
		//JSCAD uses x, z, y Roblox uses x, y, z
		const a = new Vector3(_a[0], _a[2], _a[1]);
		const b = new Vector3(_b[0], _b[2], _b[1]);
		const c = new Vector3(_c[0], _c[2], _c[1]);
		drawTriangle3D(a, b, c, color, parent);
		drawNormal(a, b, c, parent);
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
	drawConvexPolygons3D(geometry.polygons, geometry.color ?? [1, 1, 1, 1], GeometryModel);
	GeometryModel.Parent = parent;
}

function getGeometryFromPart(part: Instance) {}

export {
	drawConvexPolygon3D,
	drawConvexPolygons3D,
	drawGeometry3D,
	drawLine3D,
	drawNormal,
	drawPoint3D,
	drawTriangle3D,
	getGeometryFromPart,
};
