Parameters = require(game.ServerScriptService.dev.BenchParameters).TwoOrientedParts

task.wait(1)

local total = 0
local iterations = 500

for i = 1, iterations do
	local Part1, Part2 = Parameters()
	local t0 = os.clock()
	Part1:SubtractAsync({Part2})
	local t1 = os.clock()
    total += t1 - t0
    Part1:Destroy()
    Part2:Destroy()
end

print("avg: "..total / iterations.." sec")
