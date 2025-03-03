import type { Mat4, Vec3 } from "../maths/types";
import * as vec3 from "../maths/vec3/index";
import { fromPointAxisNormal } from "./fromPointAxisNormal";

/**
 * Transform the give connector using the given matrix.
 * @param {Mat4} matrix - a transform matrix
 * @param {connector} connector - the connector to transform
 * @returns {connector} a new connector
 * @alias module:modeling/connectors.transform
 */
export const transform = (matrix: Mat4, connector: { point: Vec3; axis: Vec3; normal: Vec3 }) => {
	// OPTIMIZE
	const newPoint = vec3.transform(vec3.create(), connector.point, matrix);
	const newAxis = vec3.subtract(
		vec3.create(),
		vec3.transform(vec3.create(), vec3.add(vec3.create(), connector.point, connector.axis), matrix),
		newPoint,
	);
	const newNormal = vec3.subtract(
		vec3.create(),
		vec3.transform(vec3.create(), vec3.add(vec3.create(), connector.point, connector.normal), matrix),
		newPoint,
	);
	return fromPointAxisNormal(newPoint, newAxis, newNormal);
};
