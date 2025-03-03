import type { Vec3 } from "../maths/types";
import * as vec3 from "../maths/vec3/index";
import { fromPointAxisNormal } from "./fromPointAxisNormal";

/**
 * Creates a new connector, with the connection point moved in the direction of the axis
 * @param {number} distance the distance to extend the connector to
 * @param {connector} connector the connector to extend
 * @returns {connector} a normalized connector
 */
export const extend = (distance: number, connector: { point: Vec3; axis: Vec3; normal: Vec3 }) => {
	const newPoint = vec3.add(
		[0, 0, 0],
		connector.point,
		vec3.scale([0, 0, 0], vec3.normalize([0, 0, 0], connector.axis), distance),
	);
	return fromPointAxisNormal(newPoint, connector.axis, connector.normal);
};
