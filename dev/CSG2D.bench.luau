--[[
This file is for use by Benchmarker (https://boatbomber.itch.io/benchmarker)

|WARNING| THIS RUNS IN YOUR REAL ENVIRONMENT. |WARNING|
You may alter workspace, DataStores, etc. This is useful for testing
the performance of functions that interact with the game environment,
but be careful!
--]]
--[[
This file is for use by Benchmarker (https://boatbomber.itch.io/benchmarker)

|WARNING| THIS RUNS IN YOUR REAL ENVIRONMENT. |WARNING|
You may alter workspace, DataStores, etc. This is useful for testing
the performance of functions that interact with the game environment,
but be careful!
--]]

local project = game.ReplicatedStorage.rbxcad
local rbxcad = require(project.modeling.src)
local intersect, subtract, union = rbxcad.booleans.intersect, rbxcad.booleans.subtract, rbxcad.booleans.union

local center = rbxcad.transforms.center
local rectangle = rbxcad.primitives.rectangle

return {
	ParameterGenerator = function()
        local Geom_1 = center({ relativeTo = {10, 10, 0} }, rectangle({ size = {4, 4} }));
        local Geom_2 = rectangle({ size = {18, 18} });
        return Geom_1, Geom_2
    end,

	Functions = {
		["intersect"] = function(Profiler, Geom_1, Geom_2) 
			Profiler.Begin("op")
            intersect(Geom_1, Geom_2)
			Profiler.End()
		end,
        ["subtract"] = function(Profiler, Geom_1, Geom_2)
			Profiler.Begin("op")
            subtract(Geom_1, Geom_2)
			Profiler.End()
		end,
        ["union"] = function(Profiler, Geom_1, Geom_2) 
			Profiler.Begin("op")
            union(Geom_1, Geom_2)
			Profiler.End()
		end
	},
}