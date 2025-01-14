type VectorText = Array<Array<Vec2>>;

interface VectorTextOptions {
	xOffset?: number;
	yOffset?: number;
	height?: number;
	lineSpacing?: number;
	letterSpacing?: number;
	align?: "left" | "center" | "right";
	extrudeOffset?: number;
	input?: string;
}

declare function vectorText(): VectorText;
declare function vectorText(text: string): VectorText;
declare function vectorText(options: VectorTextOptions): VectorText;
declare function vectorText(options: Omit<VectorTextOptions, "input">, text: string): VectorText;

interface VectorChar {
	width: number;
	height: number;
	segments: number[][][];
}

interface VectorCharOptions {
	xOffset?: number;
	yOffset?: number;
	height?: number;
	font?: {
		[key: number]: Array<number | undefined>;
		height: number;
	};
	extrudeOffset?: number;
	input?: string;
}

declare function vectorChar(): VectorChar;
declare function vectorChar(char: string): VectorChar;
declare function vectorChar(options: VectorCharOptions): VectorChar;
declare function vectorChar(options: Omit<VectorCharOptions, "input">, char: string): VectorChar;
