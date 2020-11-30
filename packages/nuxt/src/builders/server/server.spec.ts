import { MockBuilderContext } from '@nrwl/workspace/testing';
import { build, loadNuxt as load } from 'nuxt';
import { loadNuxt as start } from 'nuxt-start';
import { take } from 'rxjs/operators';

import { getMockContext } from '../../utils/testing';
import { ServerBuilderSchema } from './schema';
import { runBuilder } from './server';

const nuxtMock = {
  listen: jest.fn(),
};

jest.mock('nuxt', () => ({
  build: jest.fn(() => Promise.resolve()),
  loadNuxt: jest.fn(() => Promise.resolve(nuxtMock)),
}));

jest.mock('nuxt-start', () => ({
  loadNuxt: jest.fn(() => Promise.resolve(nuxtMock)),
}));

describe('Nuxt.js Server', () => {
  let context: MockBuilderContext;

  beforeEach(async () => {
    context = await getMockContext();
  });

  it('runs Nuxt.js dev server', async () => {
    const options: ServerBuilderSchema = {
      root: '/',
      outputPath: 'dist/nuxt',
      dev: true,
      port: 3000,
    };

    const output = await runBuilder(options, context).pipe(take(1)).toPromise();

    expect(load).toBeCalledWith({
      for: 'dev',
      rootDir: '/',
      configOverrides: {
        modulesDir: ['../../node_modules'],
        buildDir: '/root/dist/nuxt',
      },
    });
    expect(build).toBeCalled();
    expect(nuxtMock.listen).toBeCalledWith(3000);
    expect(output.success).toBe(true);
  });

  it('runs Nuxt.js server', async () => {
    const options: ServerBuilderSchema = {
      root: '/',
      outputPath: 'dist/nuxt',
      dev: false,
      port: 3000,
    };

    const output = await runBuilder(options, context).pipe(take(1))
      .toPromise();

    expect(start).toBeCalledWith({
      for: 'start',
      rootDir: '/',
      configOverrides: {
        modulesDir: ['../../node_modules'],
        buildDir: '/root/dist/nuxt',
      },
    });
    expect(nuxtMock.listen).toBeCalledWith(3000);
    expect(output.success).toBe(true);
  });
});
