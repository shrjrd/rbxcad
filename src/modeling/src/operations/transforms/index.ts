/**
 * All shapes (primitives or the results of operations) can be transformed, such as scaled or rotated.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/transforms
 * @example
 * import { center, rotateX, translate } from '@jscad/modeling/transforms'
 */

import align from "./align";
import { center, centerX, centerY, centerZ } from "./center";
import { mirror, mirrorX, mirrorY, mirrorZ } from "./mirror";
import { rotate, rotateX, rotateY, rotateZ } from "./rotate";
import { scale, scaleX, scaleY, scaleZ } from "./scale";
import transform from "./transform";
import { translate, translateX, translateY, translateZ } from "./translate";

export default {
	align,

	center,
	centerX,
	centerY,
	centerZ,

	mirror,
	mirrorX,
	mirrorY,
	mirrorZ,

	rotate,
	rotateX,
	rotateY,
	rotateZ,

	scale,
	scaleX,
	scaleY,
	scaleZ,

	transform,

	translate,
	translateX,
	translateY,
	translateZ,
};

export {
	align,
	center,
	centerX,
	centerY,
	centerZ,
	mirror,
	mirrorX,
	mirrorY,
	mirrorZ,
	rotate,
	rotateX,
	rotateY,
	rotateZ,
	scale,
	scaleX,
	scaleY,
	scaleZ,
	transform,
	translate,
	translateX,
	translateY,
	translateZ,
};
