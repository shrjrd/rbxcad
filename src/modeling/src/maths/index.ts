/**
 * Maths are computational units for fundamental Euclidean geometry. All maths operate upon array data structures.
 * Note: Maths data structures are considered immutable, so never change the contents directly.
 * @see Most computations are based upon the glMatrix library (glmatrix.net)
 * @module modeling/maths
 * @example
 * const { constants, line2, line3, mat4, plane, utils, vec2, vec3, vec4 } = require('@jscad/modeling').maths
 */

import constants from "./constants";
import line2 from "./line2";
import line3 from "./line3";
import mat4 from "./mat4";
import plane from "./plane";
import utils from "./utils";
import vec2 from "./vec2";
import vec3 from "./vec3";
import vec4 from "./vec4";

export { constants, line2, line3, mat4, plane, utils, vec2, vec3, vec4 };
export default { constants, line2, line3, mat4, plane, utils, vec2, vec3, vec4 };
