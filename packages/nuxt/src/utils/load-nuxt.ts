import { NuxtConfig } from '@nuxt/types';
import { build, loadNuxt as load } from 'nuxt';
import { loadNuxt as start } from 'nuxt-start';

export interface NuxtOptions {
  for: 'build' | 'start' | 'dev';
  projectRoot: string;
  buildDir?: string;
  port?: number;
}

export async function loadNuxt(options: NuxtOptions) {
  const configOverrides: NuxtConfig = {
    modulesDir: ['../../node_modules'],
    buildDir: options.buildDir,
  };

  const config = {
    for: options.for,
    rootDir: options.projectRoot,
    configOverrides,
  };

  if (options.for === 'dev') {
    const app = await load(config);
    await build(app);
    await app.listen(options.port);
  } else if (options.for === 'build') {
    const app = await load(config);
    await build(app);
  } else if (options.for === 'start') {
    const app = await start(config);
    await app.listen(options.port);
  }
}
