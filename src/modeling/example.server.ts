import { Workspace } from "@rbxts/services";

import { drawGeometry3D } from "./rbxUtil";
//JSCAD logo
import { colorize } from "./src/colors";
import { intersect, subtract } from "./src/operations/booleans";
import { cube, sphere } from "./src/primitives";
let outer = subtract(cube({ size: 10 }), sphere({ radius: 6.8 }));
let inner = intersect(sphere({ radius: 4 }), cube({ size: 7 }));
outer = colorize([0.65, 0.25, 0.8], outer) as Geom3;
inner = colorize([0.7, 0.7, 0.1], inner) as Geom3;
drawGeometry3D(outer, Workspace);
drawGeometry3D(inner, Workspace);

//3D text
import { path2 } from "./src/geometries";
import { union } from "./src/operations/booleans";
import { extrudeRectangular } from "./src/operations/extrusions";
import { vectorText } from "./src/text";
const outlines = vectorText({ xOffset: 0, yOffset: 0 }, "Hello\nWorld!") as Vec2[][];
const segmentToPath = (segment: Vec2[]) => {
	return path2.fromPoints({ closed: false }, segment);
};
const paths = outlines.map((segment) => segmentToPath(segment));
const o: Geom3[] = [];
paths.forEach(function (pl) {
	o.push(extrudeRectangular({ size: 2, height: 2 }, pl) as Geom3);
});
const textGeom = union(...o) as Geom3;
drawGeometry3D(textGeom, Workspace);
