import { Architect } from '@angular-devkit/architect';
import { TestingArchitectHost } from '@angular-devkit/architect/testing';
import { schema } from '@angular-devkit/core';
import { join } from 'path';
import { ServerBuilderSchema } from './schema';
import { build, loadNuxt } from 'nuxt';

const options: ServerBuilderSchema = {
  root: '',
};

const nuxtMock = {
  listen: jest.fn(),
};

jest.mock('nuxt', () => ({
  build: jest.fn(() => Promise.resolve()),
  loadNuxt: jest.fn(() => Promise.resolve(nuxtMock)),
}));

describe('Command Runner Builder', () => {
  let architect: Architect;
  let architectHost: TestingArchitectHost;

  beforeEach(async () => {
    const registry = new schema.CoreSchemaRegistry();
    registry.addPostTransform(schema.transforms.addUndefinedDefaults);

    architectHost = new TestingArchitectHost('/root', '/root');
    architect = new Architect(architectHost, registry);

    await architectHost.addBuilderFromPackage(join(__dirname, '../../..'));
  });

  it('can run', async () => {
    const run = await architect.scheduleBuilder('@vue/nuxt:serve', options);
    const output = await run.result;

    await run.stop();

    expect(loadNuxt).toBeCalledWith({
      for: 'dev',
      rootDir: '/root',
      configOverrides: { modulesDir: ['../../node_modules'] },
    });
    expect(build).toBeCalled();
    expect(output.success).toBe(true);
  });
});
