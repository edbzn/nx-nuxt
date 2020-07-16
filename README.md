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

## Application scaffolding

Generating a new application with the following:

```bash
nx generate @vue/nuxt:app <my-app> [options]
```

#### Options

**unitTestRunner** type: `"jest" | "none"`

**e2eTestRunner** type: `"jest" | "none"`

**skipFormat** type: `boolean`

## Builders

### `build`

Build a Nuxt.js application.

```bash
nx build <my-app> [options]
```

#### Options

**root** type: `string`

**outputPath** type: `string`

### `serve`

Build and serve a Nuxt.js application.

```bash
nx serve <my-app> [options]
```

#### Options

**root** type: `string`

**port** type: `number`
