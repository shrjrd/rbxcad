local rbxcad = game.ReplicatedStorage.rbxcad
local subtract = require(rbxcad.modeling.src.operations.booleans.subtract).subtract
local rbxcadUtil = require(rbxcad.rbxUtil)
local getGeometryFromPart = rbxcadUtil.getGeometryFromPart
local drawGeometry3D = rbxcadUtil.drawGeometry3D
local Params = require(game.ServerScriptService.dev.BenchParameters).TwoOrientedParts

while true do
    do
        local Part1, Part2 = Params()
        local Geometry1 = getGeometryFromPart(Part1)
        local Geometry2 = getGeometryFromPart(Part2)
        local NewGeometry = subtract(Geometry1, Geometry2)
        print(NewGeometry)
        local GeometryModel = drawGeometry3D(NewGeometry, workspace)
        print("rbxcad CSG Polygon Count: "..#NewGeometry.polygons)
        Part1:Destroy()
        Part2:Destroy()
        task.wait(5)
        GeometryModel:Destroy()
    end
    print""
    do
        local Part1, Part2 = Params()
        local NewPart = Part1:SubtractAsync({Part2})
        NewPart.Parent = workspace
        print("Roblox CSG Triangle Count: "..NewPart.TriangleCount)
        Part1:Destroy()
        Part2:Destroy()
        task.wait(5)
        NewPart:Destroy()
    end
end
