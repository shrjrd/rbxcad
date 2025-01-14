import { Error } from "@rbxts/luau-polyfill";

import flatten from "../utils/flatten";

/**
 * Convert the given RGB color values to CSS color notation (string)
 * @see https://www.w3.org/TR/css-color-3/
 * @param {...Number|Array} values - RGB or RGBA color values
 * @return {String} CSS color notation
 * @alias module:modeling/colors.rgbToHex
 */
const rgbToHex = (...values: number[] | [number[]]) => {
	values = flatten(values);
	if (values.size() < 3) throw new Error("values must contain R, G and B values");

	const r = values[0] * 255;
	const g = values[1] * 255;
	const b = values[2] * 255;

	// let s = `#${JsNumber(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).substring(1, 7)}`;
	// Convert to hex using bit operations and string formatting
	const hexNum = math.floor(0x1000000 + r * 0x10000 + g * 0x100 + b);
	let s = `#${string.format("%06x", hexNum).sub(2, 7)}`;

	if (values.size() > 3) {
		// convert alpha to opacity
		// s = s + JsNumber(values[3] * 255).toString(16);
		const alpha = math.floor(values[3] * 255);
		s = s + string.format("%02x", alpha);
	}
	return s;
};

export default rgbToHex;
