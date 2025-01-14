import { Object } from "@rbxts/luau-polyfill";

import defaultFont from "./fonts/single-line/hershey/simplex";

const defaultsVectorParams = {
	xOffset: 0,
	yOffset: 0,
	input: "?",
	align: "left",
	font: defaultFont,
	height: 14, // == old vector_xxx simplex font height
	lineSpacing: 2.142857142857143, // == 30/14 == old vector_xxx ratio
	letterSpacing: 1,
	extrudeOffset: 0,
};

// vectorsXXX parameters handler
const vectorParams = (options?: VectorCharOptions | string, input?: string) => {
	if (!input && typeOf(options) === "string") {
		options = { input: options as string };
	}
	options = options || {};
	const params = Object.assign({}, defaultsVectorParams, options);
	params.input = input || params.input;
	return params;
};

export default vectorParams;
