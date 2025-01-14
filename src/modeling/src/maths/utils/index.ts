/**
 * Utility functions for maths.
 * @module modeling/maths/utils
 * @example
 * const { area, solve2Linear } = require('@jscad/maths').utils
 */

import aboutEqualNormals from "./aboutEqualNormals";
import area from "./area";
import interpolateBetween2DPointsForY from "./interpolateBetween2DPointsForY";
import intersect from "./intersect";
import solve2Linear from "./solve2Linear";
import { cos, sin } from "./trigonometry";

export { aboutEqualNormals, area, cos, interpolateBetween2DPointsForY, intersect, sin, solve2Linear };
export default { aboutEqualNormals, area, cos, interpolateBetween2DPointsForY, intersect, sin, solve2Linear };
