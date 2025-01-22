/*
import { Workspace } from "@rbxts/services";
import { drawGeometry3D } from "./rbxUtil";
import rbxcad from "./src";
//JSCAD logo
const colorize = rbxcad.colors.colorize;
const intersect = rbxcad.booleans.intersect;
const subtract = rbxcad.booleans.subtract;
const cube = rbxcad.primitives.cube;
const sphere = rbxcad.primitives.sphere;
let outer = subtract(cube({ size: 10 }), sphere({ radius: 6.8 }));
let inner = intersect(sphere({ radius: 4 }), cube({ size: 7 }));
outer = colorize([0.65, 0.25, 0.8], outer) as Geom3;
inner = colorize([0.7, 0.7, 0.1], inner) as Geom3;
drawGeometry3D(outer, Workspace);
drawGeometry3D(inner, Workspace);
*/

/* eslint-disable */
import { Workspace } from "@rbxts/services";
import { draw,getGeometryFromPart } from "./rbxUtil";
const drawOptions = { applyTransforms: true };


import projection from "./examples/projection";
import { union } from "modeling/src/operations/booleans";
const Model = Workspace.FindFirstChild("Model1") as Model;
const PartsToProjectOn = Model.FindFirstChild("Parts") as Model;
const PartGeometries: Geom3[] = [];
for (const Part of PartsToProjectOn.GetChildren()) {
    PartGeometries.push(getGeometryFromPart(Part as Part) as Geom3);
}
const SurfaceGeometry = union(...PartGeometries) as Geom3;
const ProjectionPart = Model.FindFirstChild("ProjectionPart") as Part;
const ProjectionGeometry = getGeometryFromPart(ProjectionPart) as Geom3;
const ProjectedGeometry = projection(ProjectionPart.CFrame.LookVector, 10, ProjectionGeometry, SurfaceGeometry);
draw(Workspace, undefined, ProjectedGeometry);


import navmesh from "./examples/navmesh";
navmesh(Workspace.FindFirstChild("Model2") as Model);

// import primitives2D from "./examples/primitives/primitives2D";
// draw(Workspace, drawOptions, ...primitives2D());

// import primitives3D from "./examples/primitives/primitives3D";
// draw(Workspace, drawOptions, ...primitives3D());

// import text from "./examples/text/text";
// draw(Workspace, drawOptions, ...text({ outline_string: "Outline", flat_string: "Flat", round_string: "Round" }));

// import basicBooleans from "./examples/booleans/basicBooleans";
// draw(Workspace, drawOptions, ...basicBooleans());

// import basicColors from "./examples/colors/basicColors";
// draw(Workspace, drawOptions, ...basicColors());

// import colorCube from "./examples/colors/colorCube";
// draw(Workspace, drawOptions, ...colorCube({ method: "hsl" }));

// import center from "./examples/transforms/center";
// draw(Workspace, drawOptions, center({ centerx: true, centery: true, centerz: true }));

// import align from "./examples/transforms/align";
// draw(Workspace, drawOptions, align({ modes: ["center", "center", "center"] }));

//import extrudeAlongPath from "./examples/curves/bezier/extrudeAlongPath";
//draw(Workspace, drawOptions, ...extrudeAlongPath());

// import simpleExtrude from "./examples/curves/bezier/simpleExtrude";
// draw(Workspace, drawOptions, ...simpleExtrude());

// import expand from "./examples/expansions/expand";
// draw(Workspace, drawOptions, ...expand());

// import offset from "./examples/expansions/offset";
// draw(Workspace, drawOptions, ...offset());

//import basicExtrusions from "./examples/extrusions/basicExtrusions";
//draw(Workspace, drawOptions, ...basicExtrusions());

//import extrudeFromSlices from "./examples/extrusions/extrudeFromSlices";
//draw(Workspace, drawOptions, ...extrudeFromSlices());

//import nutsAndBolts from "./examples/extrusions/nutsAndBolts";
//draw(Workspace, drawOptions, ...nutsAndBolts());

// import hull2D from "./examples/hulls/hull2D";
// draw(Workspace, drawOptions, hull2D({ doHull: "hull2D" }));

// import hull3D from "./examples/hulls/hull3D";
// draw(Workspace, drawOptions, hull3D({ doHull: "hull3D" }));

// import measureAggregateBounds from "./examples/measurements/measureAggregateBounds";
// draw(Workspace, drawOptions, measureAggregateBounds({ rotatex: 0, rotatey: 0, rotatez: 0 }));

// import measureBounds from "./examples/measurements/measureBounds";
// draw(Workspace, drawOptions, measureBounds({ rotatex: 0, rotatey: 0, rotatez: 0 }));

// import dodecahedron from "./examples/primitives/dodecahedron";
// draw(Workspace, drawOptions, dodecahedron());

// import polyhedron from "./examples/primitives/polyhedron";
// draw(Workspace, drawOptions, polyhedron());

// import roundedCuboid from "./examples/primitives/roundedCuboid";
// draw(Workspace, drawOptions, roundedCuboid({ width: 10, height: 10, depth: 10, rounded: 1, radius: 2 }));

// import sphere from "./examples/primitives/sphere";
// draw(Workspace, drawOptions, sphere());

//import torus from "./examples/primitives/torus";
//draw(Workspace, drawOptions, ...torus());

// import transparency from "./examples/colors/transparency";
// draw(Workspace, drawOptions, transparency());
