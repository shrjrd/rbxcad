/**
 * Represents a 4x4 matrix which is column-major (when typed out it looks row-major).
 * @see {@link mat4} for data structure information.
 * @module modeling/maths/mat4
 */

import add from "./add";
import clone from "./clone";
import copy from "./copy";
import create from "./create";
import equals from "./equals";
import fromRotation from "./fromRotation";
import fromScaling from "./fromScaling";
import fromTaitBryanRotation from "./fromTaitBryanRotation";
import fromTranslation from "./fromTranslation";
import fromValues from "./fromValues";
import fromVectorRotation from "./fromVectorRotation";
import fromXRotation from "./fromXRotation";
import fromYRotation from "./fromYRotation";
import fromZRotation from "./fromZRotation";
import identity from "./identity";
import invert from "./invert";
import isIdentity from "./isIdentity";
import isMirroring from "./isMirroring";
import isOnlyTransformScale from "./isOnlyTransformScale";
import mirrorByPlane from "./mirrorByPlane";
import multiply from "./multiply";
import rotate from "./rotate";
import rotateX from "./rotateX";
import rotateY from "./rotateY";
import rotateZ from "./rotateZ";
import scale from "./scale";
import subtract from "./subtract";
import toString from "./toString";
import translate from "./translate";

export default {
	add,
	clone,
	copy,
	create,
	invert,
	equals,
	fromRotation,
	fromScaling,
	fromTaitBryanRotation,
	fromTranslation,
	fromValues,
	fromVectorRotation,
	fromXRotation,
	fromYRotation,
	fromZRotation,
	identity,
	isIdentity,
	isOnlyTransformScale,
	isMirroring,
	mirrorByPlane,
	multiply,
	rotate,
	rotateX,
	rotateY,
	rotateZ,
	scale,
	subtract,
	toString,
	translate,
};

export {
	add,
	clone,
	copy,
	create,
	equals,
	fromRotation,
	fromScaling,
	fromTaitBryanRotation,
	fromTranslation,
	fromValues,
	fromVectorRotation,
	fromXRotation,
	fromYRotation,
	fromZRotation,
	identity,
	invert,
	isIdentity,
	isMirroring,
	isOnlyTransformScale,
	mirrorByPlane,
	multiply,
	rotate,
	rotateX,
	rotateY,
	rotateZ,
	scale,
	subtract,
	toString,
	translate,
};
