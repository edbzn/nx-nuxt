import { MockBuilderContext } from '@nrwl/workspace/testing';
import { build, loadNuxt } from 'nuxt';

import { getMockContext } from '../../utils/testing';
import { runBuilder } from './builder';
import { BuildBuilderSchema } from './schema';

const nuxtMock = {
  listen: jest.fn(),
};

jest.mock('nuxt', () => ({
  build: jest.fn(() => Promise.resolve()),
  loadNuxt: jest.fn(() => Promise.resolve(nuxtMock)),
}));

describe('Nuxt.js Builder', () => {
  let context: MockBuilderContext;

  beforeEach(async () => {
    context = await getMockContext();
  });

  it('should build Nuxt.js', async () => {
    const options: BuildBuilderSchema = {
      root: '',
      outputPath: 'dist',
    };

    const output = await runBuilder(options, context).toPromise();

    expect(loadNuxt).toBeCalledWith({
      for: 'build',
      rootDir: '/root',
      configOverrides: {
        buildDir: '/root/dist',
        modulesDir: ['../../node_modules'],
      },
    });
    expect(build).toBeCalled();
    expect(nuxtMock.listen).not.toBeCalled();
    expect(output.success).toBe(true);
  });
});
