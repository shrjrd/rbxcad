/**
 * Represents a 4x4 matrix which is column-major (when typed out it looks row-major).
 * @see {@link mat4} for data structure information.
 * @module modeling/maths/mat4
 */
export { add } from "./add";
export { clone } from "./clone";
export { copy } from "./copy";
export { create } from "./create";
export { equals } from "./equals";
export { fromRotation } from "./fromRotation";
export { fromScaling } from "./fromScaling";
export { fromTaitBryanRotation } from "./fromTaitBryanRotation";
export { fromTranslation } from "./fromTranslation";
export { fromValues } from "./fromValues";
export { fromVectorRotation } from "./fromVectorRotation";
export { fromXRotation } from "./fromXRotation";
export { fromYRotation } from "./fromYRotation";
export { fromZRotation } from "./fromZRotation";
export { identity } from "./identity";
export { invert } from "./invert";
export { isIdentity } from "./isIdentity";
export { isMirroring } from "./isMirroring";
export { isOnlyTransformScale } from "./isOnlyTransformScale";
export { mirrorByPlane } from "./mirrorByPlane";
export { multiply } from "./multiply";
export { rotate } from "./rotate";
export { rotateX } from "./rotateX";
export { rotateY } from "./rotateY";
export { rotateZ } from "./rotateZ";
export { scale } from "./scale";
export { subtract } from "./subtract";
export { toString } from "./toString";
export { translate } from "./translate";

export type { Mat4 } from "./type";
