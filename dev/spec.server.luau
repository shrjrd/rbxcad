
_G.__DEV__ = true -- for luau polyfill
_G.NOCOLOR = true -- for jest lua

local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Jest = require(ReplicatedStorage.rbxts_include.node_modules["@rbxts"].jest.src)

local status, result = Jest.runCLI(script, {
	verbose = false,
	ci = false,
	setupFiles = { script.Parent.setup },
}, {
	ReplicatedStorage.rbxcad.modeling
}):awaitStatus()

if status == "Rejected" then
	print(result)
	error("Tests failed")
end
