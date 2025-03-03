import type { RGB } from "./types";
import { cssColors } from "./cssColors";

/**
 * Converts a CSS color name to RGB color.
 *
 * @param {string} s - the CSS color name
 * @return {Array} the RGB color, or undefined if not found
 * @alias module:modeling/colors.colorNameToRgb
 * @example
 * let mySphere = colorize(colorNameToRgb('lightblue'), sphere())
 */
export const colorNameToRgb = (s: string) => cssColors[s.lower() as keyof typeof cssColors] as RGB;
