import { NuxtConfig } from '@nuxt/types';
import { build, loadNuxt as load } from 'nuxt';

export interface NuxtOptions {
  for: 'build' | 'start' | 'dev' | 'dry';
  projectRoot: string;
  outputPath?: string;
  port?: number;
}

export async function loadNuxt(options: NuxtOptions) {
  const configOverrides: NuxtConfig = {
    modulesDir: ['../../node_modules'],
  };

  if (options.for === 'build') {
    configOverrides.buildDir = options.outputPath;
  }

  const nuxtApp = await load({
    for: options.for,
    rootDir: options.projectRoot,
    configOverrides,
  });

  await build(nuxtApp);

  if (options.for === 'dev') {
    await nuxtApp.listen(options.port);
  }
}
