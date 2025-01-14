import vec3 from "../maths/vec3";
import fromPointAxisNormal from "./fromPointAxisNormal";

/*
 * Normalize the given connector, calculating new axis and normal
 * @param {connector} connector - the connector to normalize
 * @returns {connector} a new connector
 */
const normalize = (connector: Connector): Connector => {
	const newaxis = vec3.normalize([0, 0, 0], connector.axis);

	// make the normal vector truly normal
	const newnormal = vec3.normalize([0, 0, 0], vec3.cross([0, 0, 0], connector.normal, connector.axis));
	vec3.cross(newnormal, newaxis, newnormal);

	return fromPointAxisNormal(connector.point, newaxis, newnormal);
};

export default normalize;
