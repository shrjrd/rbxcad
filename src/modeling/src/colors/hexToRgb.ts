import type { RGB, RGBA } from "./types";
/**
 * Converts CSS color notations (string of hex values) to RGB values.
 *
 * @see https://www.w3.org/TR/css-color-3/
 * @param {string} notation - color notation
 * @return {Array} RGB color values
 * @alias module:modeling/colors.hexToRgb
 *
 * @example
 * let mySphere = colorize(hexToRgb('#000080'), sphere()) // navy blue
 */
export const hexToRgb = (notation: string): RGB | RGBA => {
	notation = notation.gsub("#", "")[0]; //notation.replace("#", "");
	if (notation.size() < 6) throw "the given notation must contain 3 or more hex values";

	const r = tonumber(notation.sub(1, 2), 16)! / 255; //parseInt(notation.substring(0, 2), 16) / 255;
	const g = tonumber(notation.sub(3, 4), 16)! / 255; //parseInt(notation.substring(2, 4), 16) / 255;
	const b = tonumber(notation.sub(5, 6), 16)! / 255; //parseInt(notation.substring(4, 6), 16) / 255;
	if (notation.size() >= 8) {
		const a = tonumber(notation.sub(7, 8), 16)! / 255; //parseInt(notation.substring(6, 8), 16) / 255;
		return [r, g, b, a];
	}
	return [r, g, b];
};
