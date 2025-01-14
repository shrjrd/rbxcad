import { TAU } from "../constants";
import create from "./create";
import rotate from "./rotate";

/**
 * Calculates the normal of the given vector.
 * The normal value is the given vector rotated 90 degrees.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - given value
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.normal
 */
const normal = (out: Vec2, vector: Vec2): Vec2 => rotate(out, vector, create(), TAU / 4);

export default normal;
