# <img src="./skull.svg" alt="Loot Survivor Logo" width="100" height="100"> Loot Survivor SDK

[![npm version](https://img.shields.io/npm/v/loot-survivor-sdk.svg)](https://www.npmjs.com/package/loot-survivor-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/yourusername/loot-survivor-sdk.svg?branch=main)](https://travis-ci.org/yourusername/loot-survivor-sdk)

This SDK enables easy creation of Loot Survivor experiences. It provides everything you need to build a fully functioning client for Loot Survivor.

```
pnpm add @lootsurvivor/core @lootsurvivor/react
```

## Features

-   [x] Execution client
-   [x] Game Constants
-   [x] Hosted Images
-   [x] Zustand State
-   [x] Abstracted Graphql queries for deep information
-   [] gPRC provider
-   [x] React Package

## Usage

```js
// Full Provider which exposes all the Managers along with an execution client
const survivor = new LootSurvivor(
    nodeUrl,
    lootSurvivorAddress,
    beastsAddress,
    goldenTokenAddress,
    account
);

// usage
await survivor.newGame();

// Selective Managers - These contain all logic to use along with images
const beastsManager = new BeastManager();
const lootManager = new LootManager(id, xp, seed); // will tell you what your item will become
const obstacleManager = new ObstacleManager();

// usage
beastsManager.getBeastName(Beasts.Warlock);

// get image from s3
beastsManager.getBeastImage(Beasts.Warlock);
```
