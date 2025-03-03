/**
 * All shapes (primitives or the results of operations) can be assigned a color (RGBA).
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/colors
 * @example
 * import { colors } from '@jscad/modeling'
 * const { colorize, cssColors } = colors
 */
export { colorize } from "./colorize";
export { colorNameToRgb } from "./colorNameToRgb";
export * as cssColors from "./cssColors";
export { hexToRgb } from "./hexToRgb";
export { hslToRgb } from "./hslToRgb";
export { hsvToRgb } from "./hsvToRgb";
export { hueToColorComponent } from "./hueToColorComponent";
export { rgbToHex } from "./rgbToHex";
export { rgbToHsl } from "./rgbToHsl";
export { rgbToHsv } from "./rgbToHsv";

export type * from "./types";
