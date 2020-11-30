# @edbzn/nuxt

> Nx Plugin for Nuxt.js.

<img src="https://github.com/edbzn/nx-nuxt/blob/master/logo.png" alt="@edbzn/nuxt logo" width="500" />

Contains builders and schematics for managing Nuxt.js applications and libraries within an Nx workspace. It provides:

Scaffolding for creating, building, serving, linting, and testing Nuxt.js applications.
Integration with building, and serving a Nuxt.js application.

## Installing

Installing the Nuxt.js Plugin to a Nx workspace can be done with the following:

```bash
yarn add @edbzn/nuxt -D
```

## Schematics

#### `application`

Generating a new application with the following:

```bash
nx generate @edbzn/nuxt:app <my-app> [...options]
```

Available options :

- **mode** `"universal" | "spa"`
- **target** `"server" | "static"`
- **unitTestRunner** `"jest" | "none"` _(require `@nrwl/jest` to be installed)_
- **e2eTestRunner** `"cypress" | "none"` _(require `@nrwl/cypress` to be installed)_
- **skipFormat** `boolean`

## Builders

#### `build`

Build a Nuxt.js application.

```bash
nx build <my-app> [...options]
```

Available options :

- **root** `string`
- **outputPath** `string`

#### `serve`

Build and serve a Nuxt.js application.

```bash
nx serve <my-app> [...options]
```

Execute a Nuxt.js application in production.

```bash
nx serve <my-app> --dev=false [...options]
```

Available options :

- **root** `string`
- **port** `number`
- **dev** `boolean`
- **outputPath** `string`

#### `test`

Test a Nuxt.js application using `@nrwl/jest`.

```bash
nx test <my-app> [...options]
```

[Available options](https://nx.dev/latest/node/plugins/jest/builders/jest#properties).

#### `e2e`

Test a Nuxt.js application using `@nrwl/cypress`.

```bash
nx e2e <my-app> [...options]
```

[Available options](https://nx.dev/latest/node/plugins/cypress/builders/cypress#properties).
