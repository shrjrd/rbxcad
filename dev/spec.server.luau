_G.__DEV__ = true
_G.NOCOLOR = true

local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Jest = require(ReplicatedStorage.rbxts_include.node_modules["@rbxts"].jest.src)

local status, result = Jest.runCLI(script, {
	verbose = false,
	ci = false,
	setupFiles = { script.Parent.setup },
}, {
	ReplicatedStorage.Project
}):awaitStatus()

if status == "Rejected" then
	print(result)
	error("Tests failed")
end
