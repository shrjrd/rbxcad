import type { Vec3 } from "../maths/types";
/**
 * Return a string representing the given connector.
 *
 * @param {connector} connector - the connector of reference
 * @returns {string} string representation
 * @alias module:modeling/connectors.toString
 */
export const toString = (connector: { point: Vec3; axis: Vec3; normal: Vec3 }) => {
	const point = connector.point;
	const axis = connector.axis;
	const normal = connector.normal;
	return `connector: point: [${string.format("%.7f", point[0])}, ${string.format("%.7f", point[1])}, ${string.format("%.7f", point[2])},  axis: [${string.format("%.7f", axis[0])}, ${string.format("%.7f", axis[1])}, ${string.format("%.7f", axis[2])}, normal: [${string.format("%.7f", normal[0])}, ${string.format("%.7f", normal[1])}, ${string.format("%.7f", normal[2])}]`;
};
