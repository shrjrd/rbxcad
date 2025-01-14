# rbxtscad

>Solid Modelling Library for 2D and 3D Geometries

>[jscad/modeling@2.12.5](https://github.com/jscad/OpenJSCAD.org/tree/master/packages/modeling) ported to [roblox-ts](https://github.com/roblox-ts/roblox-ts)

> [!NOTE]
> Work in progress, check TODO

## Overview

This library contains boolean operations based on Constructive Solid Geometry (CSG). CSG is a modelling technique that uses boolean operations like union and intersection to combine 3D solids. This library implements CSG operations on meshes elegantly and concisely using BSP trees, and is meant to serve as an easily understandable implementation of the algorithm.

## Building from source

```bash
npm install
rbxtsc --verbose
rojo build default.project.json -o Place.rbxl
```

## Installation as package

```bash

```

## Documentation

- [API Reference](https://openjscad.xyz/docs/)
- [JSCAD User Guide](https://openjscad.xyz/guide.html)

##  Running Tests

> [!NOTE]
> Jest Lua depends on `debug.loadmodule` (`FFlagEnableLoadModule`) to run tests.

To run unit tests, build default.project.json then start a playtest session in [Run Mode](https://create.roblox.com/docs/studio/testing-modes#playtest-options) (`F8`).

## Copyrights

Some copyrights apply from integration of original libraries.

CSG Library : Copyright (c) 2012 Joost Nieuwenhuijse, under the MIT license. Copyright (c) 2011 Evan Wallace, under MIT license.

Portions of glMatrix Library: Copyright (c) 2015-2020, Brandon Jones, Colin MacKenzie IV, under MIT license.

Quickhull Library: Copyright (c) 2015 Mauricio Poppe, under the MIT license.

---

<p align="center">
This project is released under the <a href="LICENSE.md">MIT License</a>.
</p>

<div align="center">

[![MIT License](https://img.shields.io/github/license/littensy/charm-example?style=for-the-badge)](LICENSE.md)

</div>
