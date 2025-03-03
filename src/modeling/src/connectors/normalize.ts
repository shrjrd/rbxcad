import type { Vec3 } from "../maths/types";
import * as vec3 from "../maths/vec3/index";
import { fromPointAxisNormal } from "./fromPointAxisNormal";

/**
 * Normalize the given connector, calculating new axis and normal
 * @param {connector} connector - the connector to normalize
 * @returns {connector} a new connector
 */
export const normalize = (connector: { point: Vec3; axis: Vec3; normal: Vec3 }) => {
	const newAxis = vec3.normalize([0, 0, 0], connector.axis);

	// make the normal vector truly normal
	const newNormal = vec3.normalize([0, 0, 0], vec3.cross([0, 0, 0], connector.normal, connector.axis));
	vec3.cross(newNormal, newAxis, newNormal);

	return fromPointAxisNormal(connector.point, newAxis, newNormal);
};
