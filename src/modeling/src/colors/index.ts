/**
 * All shapes (primitives or the results of operations) can be assigned a color (RGBA).
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/colors
 * @example
 * import { colorize, hexToRgb } from '@jscad/modeling/colors'
 */
import colorize from "./colorize";
import colorNameToRgb from "./colorNameToRgb";
import cssColors from "./cssColors";
import hexToRgb from "./hexToRgb";
import hslToRgb from "./hslToRgb";
import hsvToRgb from "./hsvToRgb";
import hueToColorComponent from "./hueToColorComponent";
import rgbToHex from "./rgbToHex";
import rgbToHsl from "./rgbToHsl";
import rgbToHsv from "./rgbToHsv";

export default {
	colorize,
	colorNameToRgb,
	cssColors,
	hexToRgb,
	hslToRgb,
	hsvToRgb,
	hueToColorComponent,
	rgbToHex,
	rgbToHsl,
	rgbToHsv,
};

export {
	colorize,
	colorNameToRgb,
	cssColors,
	hexToRgb,
	hslToRgb,
	hsvToRgb,
	hueToColorComponent,
	rgbToHex,
	rgbToHsl,
	rgbToHsv,
};
