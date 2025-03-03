import type { Vec3 } from "../maths/types";
import * as vec3 from "../maths/vec3/index";
import { create } from "./create";

/**
 * Create a connector from the given point, axis and normal.
 * @param {Vec3} point - the point of the connector, relative to the parent geometry
 * @param {Vec3} axis - the axis (directional vector) of the connector
 * @param {Vec3} normal - the normal (directional vector) of the connector, perpendicular to the axis
 * @returns {connector} a new connector
 * @alias module:modeling/connectors.fromPointsAxisNormal
 */
export const fromPointAxisNormal = (point: Vec3, axis: Vec3, normal: Vec3) => {
	const connector = create();
	connector.point = vec3.clone(point);
	connector.axis = vec3.normalize(vec3.create(), axis);
	connector.normal = vec3.normalize(vec3.create(), normal);
	return connector;
};
