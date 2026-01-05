import { Config } from "@rbxts/jest";
import setupTestsModule from "./jest.setup";

export = {
	testMatch: ["**/*.test"],
	setupFiles: [setupTestsModule],
} satisfies Config;
