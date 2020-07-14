import { loadNuxt as load, build } from 'nuxt';

export interface NuxtOptions {
  for: 'build' | 'start' | 'dev' | 'dry';
  projectRoot: string;
}

/**
 * @todo: bind outputPath
 */
export async function loadNuxt(options: NuxtOptions) {
  const nuxtApp = await load({
    for: options.for,
    rootDir: options.projectRoot,
    configOverrides: {
      modulesDir: ['../../node_modules'],
    },
  });

  await build(nuxtApp);

  if (options.for === 'dev') {
    await nuxtApp.listen(3000);
  }
}
