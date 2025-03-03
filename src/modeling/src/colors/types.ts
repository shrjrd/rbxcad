export interface RGB extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
}

export interface RGBA extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
	3: number;
}

export interface HSL extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
}

export interface HSLA extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
	3: number;
}

export interface HSV extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
}

export interface HSVA extends Array<number> {
	[index: number]: number;
	0: number;
	1: number;
	2: number;
	3: number;
}
