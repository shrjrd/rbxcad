import { Error } from "@rbxts/luau-polyfill";

import flatten from "../utils/flatten";

/**
 * Converts an RGB color value to HSV.
 *
 * @see http://en.wikipedia.org/wiki/HSV_color_space.
 * @param {...Number|Array} values - RGB or RGBA color values
 * @return {Array} HSV or HSVA color values
 * @alias module:modeling/colors.rgbToHsv
 */
const rgbToHsv = (...values: number[] | [number[]]) => {
	values = flatten(values);
	if (values.size() < 3) throw new Error("values must contain R, G and B values");

	const r = values[0];
	const g = values[1];
	const b = values[2];

	const max = math.max(r, g, b);
	const min = math.min(r, g, b);
	let h;
	const v = max;

	const d = max - min;
	const s = max === 0 ? 0 : d / max;

	if (max === min) {
		h = 0; // achromatic
	} else {
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h! /= 6;
	}

	if (values.size() > 3) {
		// add alpha if provided
		const a = values[3];
		return [h, s, v, a];
	}
	return [h, s, v];
};

export default rgbToHsv;
