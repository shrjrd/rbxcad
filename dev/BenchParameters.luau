local function TwoOrientedParts()
    local Part1 = Instance.new("Part")
    Part1.Anchored = true
    Part1.Size = Vector3.new(4, 1, 2)
    Part1.CFrame = CFrame.new(4.76837158e-07, 0.500000954, -5, 0.550584495, -0.210404962, 0.807828486, 0.44573921, 0.892311871, -0.0713894069, -0.705814064, 0.399386585, 0.585078895)
    Part1.Name = "_BenchPart1"
    Part1.Parent = workspace

    local Part2 = Instance.new("Part")
    Part2.Anchored = true
    Part2.Size = Vector3.new(4, 1, 2)
    Part2.CFrame = CFrame.new(0, 2.50000095, -5, 0.551297069, -0.585965633, 0.593898892, 0.834309042, 0.387196004, -0.392438173, 0, 0.711845279, 0.702336371)
    Part2.Name = "_BenchPart2"
    Part2.Parent = workspace

    return Part1, Part2
end

return {
    TwoOrientedParts = TwoOrientedParts,
}