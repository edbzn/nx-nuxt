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

  switch (options.for) {
    case 'dev':
      const dev = await load(config);
      await build(dev);
      await dev.listen(options.port);
      break;
    case 'build':
      const app = await load(config);
      await build(app);
      break;
    case 'start':
      const nuxt = await start(config);
      await nuxt.listen(options.port);
      break;
  }
}
