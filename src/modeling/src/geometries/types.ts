import type { Geom2 } from "./geom2/type";
import type { Geom3 } from "./geom3/type";
import type { Path2 } from "./path2/type";
import type { Poly3 } from "./poly3/type";
import type { Slice } from "./slice/type";
import type { RGB, RGBA } from "../colors/index";

// NOTE (@ahdinosaur): Poly2 is not included as not well-supported.
// see https://github.com/jscad/OpenJSCAD.org/pull/726#issuecomment-724575265
export type Geometry = Geom2 | Geom3 | Poly3 | Path2;

export type Color = RGB | RGBA;

export interface Colored {
	color: Color;
}

export type { Geom2 } from "./geom2/type";
export type { Geom3 } from "./geom3/type";
export type { Path2 } from "./path2/type";
export type { Poly2 } from "./poly2/type";
export type { Poly3 } from "./poly3/type";
export type { Slice } from "./slice/type";
