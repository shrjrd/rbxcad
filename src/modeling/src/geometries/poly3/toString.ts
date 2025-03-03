import type { Poly3 } from "./type";
import * as vec3 from "../../maths/vec3/index";

/**
 * Convert the given polygon to a readable string.
 * @param {Poly3} polygon - the polygon to convert
 * @return {String} the string representation
 * @alias module:modeling/geometries/poly3.toString
 */
export const toString = (polygon: Poly3) => `poly3: [${polygon.vertices.map(vec3.toString).join(", ")}]`;
