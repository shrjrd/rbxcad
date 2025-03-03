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
local getGeometryFromPart = require(project.rbxUtil).getGeometryFromPart
local rbxcad = require(project.modeling.src)
local intersect, subtract, union = rbxcad.booleans.intersect, rbxcad.booleans.subtract, rbxcad.booleans.union

return {
	ParameterGenerator = require(game.ServerScriptService.dev.BenchParameters).TwoOrientedParts,

	AfterAll = function() 
		workspace._BenchPart1:Destroy()
		workspace._BenchPart2:Destroy()	
        workspace._BenchPart1:Destroy()
		workspace._BenchPart2:Destroy()	
        workspace._BenchPart1:Destroy()
		workspace._BenchPart2:Destroy()	
	end,
	AfterEach = function() 
		workspace._BenchPart1:Destroy()
		workspace._BenchPart2:Destroy()	
	end,

	Functions = {
		["intersect"] = function(Profiler, Part1, Part2) 
			Profiler.Begin("init")
			local Geometry1 = getGeometryFromPart(Part1)
			local Geometry2 = getGeometryFromPart(Part2)
			Profiler.End()
			Profiler.Begin("op")
			intersect(Geometry1, Geometry2)
			Profiler.End()
		end,
        ["subtract"] = function(Profiler, Part1, Part2) 
			Profiler.Begin("init")
			local Geometry1 = getGeometryFromPart(Part1)
			local Geometry2 = getGeometryFromPart(Part2)
			Profiler.End()
			Profiler.Begin("op")
			subtract(Geometry1, Geometry2)
			Profiler.End()
		end,
        ["union"] = function(Profiler, Part1, Part2) 
			Profiler.Begin("init")
			local Geometry1 = getGeometryFromPart(Part1)
			local Geometry2 = getGeometryFromPart(Part2)
			Profiler.End()
			Profiler.Begin("op")
			union(Geometry1, Geometry2)
			Profiler.End()
		end
	},
}