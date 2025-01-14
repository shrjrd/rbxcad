import vec3 from "../maths/vec3";
import fromPointAxisNormal from "./fromPointAxisNormal";

/**
 * Transform the give connector using the given matrix.
 * @param {mat4} matrix - a transform matrix
 * @param {connector} connector - the connector to transform
 * @returns {connector} a new connector
 * @alias module:modeling/connectors.transform
 */
const transform = (matrix: Mat4, connector: Connector): Connector => {
	// OPTIMIZE
	const newpoint = vec3.transform(vec3.create(), connector.point, matrix);
	const newaxis = vec3.subtract(
		vec3.create(),
		vec3.transform(vec3.create(), vec3.add(vec3.create(), connector.point, connector.axis), matrix),
		newpoint,
	);
	const newnormal = vec3.subtract(
		vec3.create(),
		vec3.transform(vec3.create(), vec3.add(vec3.create(), connector.point, connector.normal), matrix),
		newpoint,
	);
	return fromPointAxisNormal(newpoint, newaxis, newnormal);
};

export default transform;
