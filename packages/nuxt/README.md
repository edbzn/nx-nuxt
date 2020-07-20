# @vue/nuxt

> A Nuxt.js Plugin for Nx Workspaces.

Contains builders and schematics for managing Nuxt.js applications and libraries within an Nx workspace. It provides:

Scaffolding for creating, building, serving, linting, and testing Nuxt.js applications.
Integration with building, and serving a Nuxt.js application.

## Installing the Plugin

Installing the Nuxt plugin to a Nx workspace can be done with the following:

```bash
yarn add @edbzn/nuxt -D
```

## Application

Generating a new application with the following:

```bash
nx generate @edbzn/nuxt:app <my-app> [options]
```

**mode** `"universal" | "spa"`

**target** `"server" | "static"`

**unitTestRunner** `"jest" | "none"`

**e2eTestRunner** `"cypress" | "none"`

**skipFormat** `boolean`

## Builders

#### `build`

Build a Nuxt.js application.

```bash
nx build <my-app> [options]
```

**root** `string`

**outputPath** `string`

#### `serve`

Build and serve a Nuxt.js application.

```bash
nx serve <my-app> [options]
```

**root** `string`

**port** `number`
