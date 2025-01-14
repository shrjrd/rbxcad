/**
 * Texts provide sets of segments for each character or text strings.
 * The segments can be used to create outlines for both 2D and 3D geometry.
 * Note: Only ASCII characters are supported.
 * @module modeling/text
 * @example
 * const { vectorChar, vectorText } = require('@jscad/modeling').text
 */

import vectorChar from "./vectorChar";
import vectorText from "./vectorText";

export default { vectorChar, vectorText };

export { vectorChar, vectorText };
