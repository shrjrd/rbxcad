# rbxcad

[jscad/modeling@3.0.1-alpha.0](https://github.com/jscad/OpenJSCAD.org/releases/tag/%40jscad%2Fmodeling%403.0.1-alpha.0) ported to [roblox-ts](https://github.com/roblox-ts/roblox-ts)

## Overview

This library contains boolean operations based on Constructive Solid Geometry (CSG). CSG is a modeling technique that uses boolean operations like union and intersection to combine 3D solids. This library implements CSG operations on meshes elegantly and concisely using BSP trees, and is meant to serve as an easily understandable implementation of the algorithm.

## Installation

```bash
npm install @rbxts/rbxcad
```

## Usage

```typescript
import {colors, curves, geometries, maths, measurements, primitives, text} from "@rbxts/rbxcad";
import {booleans, extrusions, hulls, modifiers, offsets, transforms} from "@rbxts/rbxcad";
```

Examples are included in src/examples

## Documentation

- [API Reference](https://openjscad.xyz/docs/)
- [JSCAD User Guide](https://openjscad.xyz/guide.html)

## Running Tests

> [!NOTE]
> [Jest Lua](https://github.com/jsdotlua/jest-lua) depends on `debug.loadmodule` (`FFlagEnableLoadModule`) to run tests.

```bash
npm install
npm run buildrbxl
```
Open the rbxl in Roblox Studio, then start a playtest session in [Run Mode](https://create.roblox.com/docs/studio/testing-modes#playtest-options) (`F8`).

## Copyrights

Some copyrights apply from integration of original libraries.

CSG Library : Copyright (c) 2012 Joost Nieuwenhuijse, under the MIT license. Copyright (c) 2011 Evan Wallace, under MIT license.

Portions of glMatrix Library: Copyright (c) 2015-2020, Brandon Jones, Colin MacKenzie IV, under MIT license.

Quickhull Library: Copyright (c) 2015 Mauricio Poppe, under the MIT license.

## License

[The MIT License (MIT)](../../LICENSE) (unless specified otherwise)
