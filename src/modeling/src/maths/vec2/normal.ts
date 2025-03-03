import type { Vec2 } from "../types";
import { TAU } from "../constants";
import { create } from "./create";
import { rotate } from "./rotate";

/**
 * Calculates the normal of the given vector.
 * The normal value is the given vector rotated 90 degrees.
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} vector - given value
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.normal
 */
export const normal = (out: Vec2, vector: Vec2) => rotate(out, vector, create(), TAU / 4);
