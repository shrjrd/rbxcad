// -- data source from from http://paulbourke.net/dataformats/hershey/
// -- reduced to save some bytes...
// { [ascii code]: [width, x, y, ...] } - undefined value as path separator
export default {
	height: 14,
	32: [16],
	33: [10, 5, 21, 5, 7, undefined, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2],
	34: [16, 4, 21, 4, 14, undefined, 12, 21, 12, 14],
	35: [21, 11, 25, 4, -7, undefined, 17, 25, 10, -7, undefined, 4, 12, 18, 12, undefined, 3, 6, 17, 6],
	36: [
		20,
		8,
		25,
		8,
		-4,
		undefined,
		12,
		25,
		12,
		-4,
		undefined,
		17,
		18,
		15,
		20,
		12,
		21,
		8,
		21,
		5,
		20,
		3,
		18,
		3,
		16,
		4,
		14,
		5,
		13,
		7,
		12,
		13,
		10,
		15,
		9,
		16,
		8,
		17,
		6,
		17,
		3,
		15,
		1,
		12,
		0,
		8,
		0,
		5,
		1,
		3,
		3,
	],
	37: [
		24,
		21,
		21,
		3,
		0,
		undefined,
		8,
		21,
		10,
		19,
		10,
		17,
		9,
		15,
		7,
		14,
		5,
		14,
		3,
		16,
		3,
		18,
		4,
		20,
		6,
		21,
		8,
		21,
		10,
		20,
		13,
		19,
		16,
		19,
		19,
		20,
		21,
		21,
		undefined,
		17,
		7,
		15,
		6,
		14,
		4,
		14,
		2,
		16,
		0,
		18,
		0,
		20,
		1,
		21,
		3,
		21,
		5,
		19,
		7,
		17,
		7,
	],
	38: [
		26, 23, 12, 23, 13, 22, 14, 21, 14, 20, 13, 19, 11, 17, 6, 15, 3, 13, 1, 11, 0, 7, 0, 5, 1, 4, 2, 3, 4, 3, 6, 4,
		8, 5, 9, 12, 13, 13, 14, 14, 16, 14, 18, 13, 20, 11, 21, 9, 20, 8, 18, 8, 16, 9, 13, 11, 10, 16, 3, 18, 1, 20,
		0, 22, 0, 23, 1, 23, 2,
	],
	39: [10, 5, 19, 4, 20, 5, 21, 6, 20, 6, 18, 5, 16, 4, 15],
	40: [14, 11, 25, 9, 23, 7, 20, 5, 16, 4, 11, 4, 7, 5, 2, 7, -2, 9, -5, 11, -7],
	41: [14, 3, 25, 5, 23, 7, 20, 9, 16, 10, 11, 10, 7, 9, 2, 7, -2, 5, -5, 3, -7],
	42: [16, 8, 21, 8, 9, undefined, 3, 18, 13, 12, undefined, 13, 18, 3, 12],
	43: [26, 13, 18, 13, 0, undefined, 4, 9, 22, 9],
	44: [10, 6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6, -1, 5, -3, 4, -4],
	45: [26, 4, 9, 22, 9],
	46: [10, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2],
	47: [22, 20, 25, 2, -7],
	48: [
		20, 9, 21, 6, 20, 4, 17, 3, 12, 3, 9, 4, 4, 6, 1, 9, 0, 11, 0, 14, 1, 16, 4, 17, 9, 17, 12, 16, 17, 14, 20, 11,
		21, 9, 21,
	],
	49: [20, 6, 17, 8, 18, 11, 21, 11, 0],
	50: [20, 4, 16, 4, 17, 5, 19, 6, 20, 8, 21, 12, 21, 14, 20, 15, 19, 16, 17, 16, 15, 15, 13, 13, 10, 3, 0, 17, 0],
	51: [20, 5, 21, 16, 21, 10, 13, 13, 13, 15, 12, 16, 11, 17, 8, 17, 6, 16, 3, 14, 1, 11, 0, 8, 0, 5, 1, 4, 2, 3, 4],
	52: [20, 13, 21, 3, 7, 18, 7, undefined, 13, 21, 13, 0],
	53: [
		20, 15, 21, 5, 21, 4, 12, 5, 13, 8, 14, 11, 14, 14, 13, 16, 11, 17, 8, 17, 6, 16, 3, 14, 1, 11, 0, 8, 0, 5, 1,
		4, 2, 3, 4,
	],
	54: [
		20, 16, 18, 15, 20, 12, 21, 10, 21, 7, 20, 5, 17, 4, 12, 4, 7, 5, 3, 7, 1, 10, 0, 11, 0, 14, 1, 16, 3, 17, 6,
		17, 7, 16, 10, 14, 12, 11, 13, 10, 13, 7, 12, 5, 10, 4, 7,
	],
	55: [20, 17, 21, 7, 0, undefined, 3, 21, 17, 21],
	56: [
		20, 8, 21, 5, 20, 4, 18, 4, 16, 5, 14, 7, 13, 11, 12, 14, 11, 16, 9, 17, 7, 17, 4, 16, 2, 15, 1, 12, 0, 8, 0, 5,
		1, 4, 2, 3, 4, 3, 7, 4, 9, 6, 11, 9, 12, 13, 13, 15, 14, 16, 16, 16, 18, 15, 20, 12, 21, 8, 21,
	],
	57: [
		20, 16, 14, 15, 11, 13, 9, 10, 8, 9, 8, 6, 9, 4, 11, 3, 14, 3, 15, 4, 18, 6, 20, 9, 21, 10, 21, 13, 20, 15, 18,
		16, 14, 16, 9, 15, 4, 13, 1, 10, 0, 8, 0, 5, 1, 4, 3,
	],
	58: [10, 5, 14, 4, 13, 5, 12, 6, 13, 5, 14, undefined, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2],
	59: [10, 5, 14, 4, 13, 5, 12, 6, 13, 5, 14, undefined, 6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6, -1, 5, -3, 4, -4],
	60: [24, 20, 18, 4, 9, 20, 0],
	61: [26, 4, 12, 22, 12, undefined, 4, 6, 22, 6],
	62: [24, 4, 18, 20, 9, 4, 0],
	63: [
		18,
		3,
		16,
		3,
		17,
		4,
		19,
		5,
		20,
		7,
		21,
		11,
		21,
		13,
		20,
		14,
		19,
		15,
		17,
		15,
		15,
		14,
		13,
		13,
		12,
		9,
		10,
		9,
		7,
		undefined,
		9,
		2,
		8,
		1,
		9,
		0,
		10,
		1,
		9,
		2,
	],
	64: [
		27,
		18,
		13,
		17,
		15,
		15,
		16,
		12,
		16,
		10,
		15,
		9,
		14,
		8,
		11,
		8,
		8,
		9,
		6,
		11,
		5,
		14,
		5,
		16,
		6,
		17,
		8,
		undefined,
		12,
		16,
		10,
		14,
		9,
		11,
		9,
		8,
		10,
		6,
		11,
		5,
		undefined,
		18,
		16,
		17,
		8,
		17,
		6,
		19,
		5,
		21,
		5,
		23,
		7,
		24,
		10,
		24,
		12,
		23,
		15,
		22,
		17,
		20,
		19,
		18,
		20,
		15,
		21,
		12,
		21,
		9,
		20,
		7,
		19,
		5,
		17,
		4,
		15,
		3,
		12,
		3,
		9,
		4,
		6,
		5,
		4,
		7,
		2,
		9,
		1,
		12,
		0,
		15,
		0,
		18,
		1,
		20,
		2,
		21,
		3,
		undefined,
		19,
		16,
		18,
		8,
		18,
		6,
		19,
		5,
	],
	65: [18, 9, 21, 1, 0, undefined, 9, 21, 17, 0, undefined, 4, 7, 14, 7],
	66: [
		21,
		4,
		21,
		4,
		0,
		undefined,
		4,
		21,
		13,
		21,
		16,
		20,
		17,
		19,
		18,
		17,
		18,
		15,
		17,
		13,
		16,
		12,
		13,
		11,
		undefined,
		4,
		11,
		13,
		11,
		16,
		10,
		17,
		9,
		18,
		7,
		18,
		4,
		17,
		2,
		16,
		1,
		13,
		0,
		4,
		0,
	],
	67: [
		21, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15,
		1, 17, 3, 18, 5,
	],
	68: [
		21,
		4,
		21,
		4,
		0,
		undefined,
		4,
		21,
		11,
		21,
		14,
		20,
		16,
		18,
		17,
		16,
		18,
		13,
		18,
		8,
		17,
		5,
		16,
		3,
		14,
		1,
		11,
		0,
		4,
		0,
	],
	69: [19, 4, 21, 4, 0, undefined, 4, 21, 17, 21, undefined, 4, 11, 12, 11, undefined, 4, 0, 17, 0],
	70: [18, 4, 21, 4, 0, undefined, 4, 21, 17, 21, undefined, 4, 11, 12, 11],
	71: [
		21,
		18,
		16,
		17,
		18,
		15,
		20,
		13,
		21,
		9,
		21,
		7,
		20,
		5,
		18,
		4,
		16,
		3,
		13,
		3,
		8,
		4,
		5,
		5,
		3,
		7,
		1,
		9,
		0,
		13,
		0,
		15,
		1,
		17,
		3,
		18,
		5,
		18,
		8,
		undefined,
		13,
		8,
		18,
		8,
	],
	72: [22, 4, 21, 4, 0, undefined, 18, 21, 18, 0, undefined, 4, 11, 18, 11],
	73: [8, 4, 21, 4, 0],
	74: [16, 12, 21, 12, 5, 11, 2, 10, 1, 8, 0, 6, 0, 4, 1, 3, 2, 2, 5, 2, 7],
	75: [21, 4, 21, 4, 0, undefined, 18, 21, 4, 7, undefined, 9, 12, 18, 0],
	76: [17, 4, 21, 4, 0, undefined, 4, 0, 16, 0],
	77: [24, 4, 21, 4, 0, undefined, 4, 21, 12, 0, undefined, 20, 21, 12, 0, undefined, 20, 21, 20, 0],
	78: [22, 4, 21, 4, 0, undefined, 4, 21, 18, 0, undefined, 18, 21, 18, 0],
	79: [
		22, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 19, 8, 19, 13,
		18, 16, 17, 18, 15, 20, 13, 21, 9, 21,
	],
	80: [21, 4, 21, 4, 0, undefined, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 14, 17, 12, 16, 11, 13, 10, 4, 10],
	81: [
		22,
		9,
		21,
		7,
		20,
		5,
		18,
		4,
		16,
		3,
		13,
		3,
		8,
		4,
		5,
		5,
		3,
		7,
		1,
		9,
		0,
		13,
		0,
		15,
		1,
		17,
		3,
		18,
		5,
		19,
		8,
		19,
		13,
		18,
		16,
		17,
		18,
		15,
		20,
		13,
		21,
		9,
		21,
		undefined,
		12,
		4,
		18,
		-2,
	],
	82: [
		21,
		4,
		21,
		4,
		0,
		undefined,
		4,
		21,
		13,
		21,
		16,
		20,
		17,
		19,
		18,
		17,
		18,
		15,
		17,
		13,
		16,
		12,
		13,
		11,
		4,
		11,
		undefined,
		11,
		11,
		18,
		0,
	],
	83: [
		20, 17, 18, 15, 20, 12, 21, 8, 21, 5, 20, 3, 18, 3, 16, 4, 14, 5, 13, 7, 12, 13, 10, 15, 9, 16, 8, 17, 6, 17, 3,
		15, 1, 12, 0, 8, 0, 5, 1, 3, 3,
	],
	84: [16, 8, 21, 8, 0, undefined, 1, 21, 15, 21],
	85: [22, 4, 21, 4, 6, 5, 3, 7, 1, 10, 0, 12, 0, 15, 1, 17, 3, 18, 6, 18, 21],
	86: [18, 1, 21, 9, 0, undefined, 17, 21, 9, 0],
	87: [24, 2, 21, 7, 0, undefined, 12, 21, 7, 0, undefined, 12, 21, 17, 0, undefined, 22, 21, 17, 0],
	88: [20, 3, 21, 17, 0, undefined, 17, 21, 3, 0],
	89: [18, 1, 21, 9, 11, 9, 0, undefined, 17, 21, 9, 11],
	90: [20, 17, 21, 3, 0, undefined, 3, 21, 17, 21, undefined, 3, 0, 17, 0],
	91: [14, 4, 25, 4, -7, undefined, 5, 25, 5, -7, undefined, 4, 25, 11, 25, undefined, 4, -7, 11, -7],
	92: [14, 0, 21, 14, -3],
	93: [14, 9, 25, 9, -7, undefined, 10, 25, 10, -7, undefined, 3, 25, 10, 25, undefined, 3, -7, 10, -7],
	94: [16, 6, 15, 8, 18, 10, 15, undefined, 3, 12, 8, 17, 13, 12, undefined, 8, 17, 8, 0],
	95: [16, 0, -2, 16, -2],
	96: [10, 6, 21, 5, 20, 4, 18, 4, 16, 5, 15, 6, 16, 5, 17],
	97: [
		19,
		15,
		14,
		15,
		0,
		undefined,
		15,
		11,
		13,
		13,
		11,
		14,
		8,
		14,
		6,
		13,
		4,
		11,
		3,
		8,
		3,
		6,
		4,
		3,
		6,
		1,
		8,
		0,
		11,
		0,
		13,
		1,
		15,
		3,
	],
	98: [
		19,
		4,
		21,
		4,
		0,
		undefined,
		4,
		11,
		6,
		13,
		8,
		14,
		11,
		14,
		13,
		13,
		15,
		11,
		16,
		8,
		16,
		6,
		15,
		3,
		13,
		1,
		11,
		0,
		8,
		0,
		6,
		1,
		4,
		3,
	],
	99: [18, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3],
	100: [
		19,
		15,
		21,
		15,
		0,
		undefined,
		15,
		11,
		13,
		13,
		11,
		14,
		8,
		14,
		6,
		13,
		4,
		11,
		3,
		8,
		3,
		6,
		4,
		3,
		6,
		1,
		8,
		0,
		11,
		0,
		13,
		1,
		15,
		3,
	],
	101: [
		18, 3, 8, 15, 8, 15, 10, 14, 12, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13,
		1, 15, 3,
	],
	102: [12, 10, 21, 8, 21, 6, 20, 5, 17, 5, 0, undefined, 2, 14, 9, 14],
	103: [
		19,
		15,
		14,
		15,
		-2,
		14,
		-5,
		13,
		-6,
		11,
		-7,
		8,
		-7,
		6,
		-6,
		undefined,
		15,
		11,
		13,
		13,
		11,
		14,
		8,
		14,
		6,
		13,
		4,
		11,
		3,
		8,
		3,
		6,
		4,
		3,
		6,
		1,
		8,
		0,
		11,
		0,
		13,
		1,
		15,
		3,
	],
	104: [19, 4, 21, 4, 0, undefined, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0],
	105: [8, 3, 21, 4, 20, 5, 21, 4, 22, 3, 21, undefined, 4, 14, 4, 0],
	106: [10, 5, 21, 6, 20, 7, 21, 6, 22, 5, 21, undefined, 6, 14, 6, -3, 5, -6, 3, -7, 1, -7],
	107: [17, 4, 21, 4, 0, undefined, 14, 14, 4, 4, undefined, 8, 8, 15, 0],
	108: [8, 4, 21, 4, 0],
	109: [
		30,
		4,
		14,
		4,
		0,
		undefined,
		4,
		10,
		7,
		13,
		9,
		14,
		12,
		14,
		14,
		13,
		15,
		10,
		15,
		0,
		undefined,
		15,
		10,
		18,
		13,
		20,
		14,
		23,
		14,
		25,
		13,
		26,
		10,
		26,
		0,
	],
	110: [19, 4, 14, 4, 0, undefined, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0],
	111: [
		19, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3, 16, 6, 16, 8, 15, 11, 13, 13, 11,
		14, 8, 14,
	],
	112: [
		19,
		4,
		14,
		4,
		-7,
		undefined,
		4,
		11,
		6,
		13,
		8,
		14,
		11,
		14,
		13,
		13,
		15,
		11,
		16,
		8,
		16,
		6,
		15,
		3,
		13,
		1,
		11,
		0,
		8,
		0,
		6,
		1,
		4,
		3,
	],
	113: [
		19,
		15,
		14,
		15,
		-7,
		undefined,
		15,
		11,
		13,
		13,
		11,
		14,
		8,
		14,
		6,
		13,
		4,
		11,
		3,
		8,
		3,
		6,
		4,
		3,
		6,
		1,
		8,
		0,
		11,
		0,
		13,
		1,
		15,
		3,
	],
	114: [13, 4, 14, 4, 0, undefined, 4, 8, 5, 11, 7, 13, 9, 14, 12, 14],
	115: [
		17, 14, 11, 13, 13, 10, 14, 7, 14, 4, 13, 3, 11, 4, 9, 6, 8, 11, 7, 13, 6, 14, 4, 14, 3, 13, 1, 10, 0, 7, 0, 4,
		1, 3, 3,
	],
	116: [12, 5, 21, 5, 4, 6, 1, 8, 0, 10, 0, undefined, 2, 14, 9, 14],
	117: [19, 4, 14, 4, 4, 5, 1, 7, 0, 10, 0, 12, 1, 15, 4, undefined, 15, 14, 15, 0],
	118: [16, 2, 14, 8, 0, undefined, 14, 14, 8, 0],
	119: [22, 3, 14, 7, 0, undefined, 11, 14, 7, 0, undefined, 11, 14, 15, 0, undefined, 19, 14, 15, 0],
	120: [17, 3, 14, 14, 0, undefined, 14, 14, 3, 0],
	121: [16, 2, 14, 8, 0, undefined, 14, 14, 8, 0, 6, -4, 4, -6, 2, -7, 1, -7],
	122: [17, 14, 14, 3, 0, undefined, 3, 14, 14, 14, undefined, 3, 0, 14, 0],
	123: [
		14,
		9,
		25,
		7,
		24,
		6,
		23,
		5,
		21,
		5,
		19,
		6,
		17,
		7,
		16,
		8,
		14,
		8,
		12,
		6,
		10,
		undefined,
		7,
		24,
		6,
		22,
		6,
		20,
		7,
		18,
		8,
		17,
		9,
		15,
		9,
		13,
		8,
		11,
		4,
		9,
		8,
		7,
		9,
		5,
		9,
		3,
		8,
		1,
		7,
		0,
		6,
		-2,
		6,
		-4,
		7,
		-6,
		undefined,
		6,
		8,
		8,
		6,
		8,
		4,
		7,
		2,
		6,
		1,
		5,
		-1,
		5,
		-3,
		6,
		-5,
		7,
		-6,
		9,
		-7,
	],
	124: [8, 4, 25, 4, -7],
	125: [
		14,
		5,
		25,
		7,
		24,
		8,
		23,
		9,
		21,
		9,
		19,
		8,
		17,
		7,
		16,
		6,
		14,
		6,
		12,
		8,
		10,
		undefined,
		7,
		24,
		8,
		22,
		8,
		20,
		7,
		18,
		6,
		17,
		5,
		15,
		5,
		13,
		6,
		11,
		10,
		9,
		6,
		7,
		5,
		5,
		5,
		3,
		6,
		1,
		7,
		0,
		8,
		-2,
		8,
		-4,
		7,
		-6,
		undefined,
		8,
		8,
		6,
		6,
		6,
		4,
		7,
		2,
		8,
		1,
		9,
		-1,
		9,
		-3,
		8,
		-5,
		7,
		-6,
		5,
		-7,
	],
	126: [
		24,
		3,
		6,
		3,
		8,
		4,
		11,
		6,
		12,
		8,
		12,
		10,
		11,
		14,
		8,
		16,
		7,
		18,
		7,
		20,
		8,
		21,
		10,
		undefined,
		3,
		8,
		4,
		10,
		6,
		11,
		8,
		11,
		10,
		10,
		14,
		7,
		16,
		6,
		18,
		6,
		20,
		7,
		21,
		10,
		21,
		12,
	],
};
