import { MockBuilderContext } from '@nrwl/workspace/testing';
import { build, loadNuxt } from 'nuxt';
import { getMockContext } from '../../utils/testing';
import { ServerBuilderSchema } from './schema';
import { runBuilder } from './server';
import { take } from 'rxjs/operators';

const nuxtMock = {
  listen: jest.fn(),
};

jest.mock('nuxt', () => ({
  build: jest.fn(() => Promise.resolve()),
  loadNuxt: jest.fn(() => Promise.resolve(nuxtMock)),
}));

describe('Nuxt.js Server', () => {
  let context: MockBuilderContext;

  beforeEach(async () => {
    context = await getMockContext();
  });

  it('can run', async () => {
    const options: ServerBuilderSchema = {
      root: '/',
      port: 3000,
    };

    const output = await runBuilder(options, context).pipe(take(1)).toPromise();

    expect(loadNuxt).toBeCalledWith({
      for: 'dev',
      rootDir: '/',
      configOverrides: { modulesDir: ['../../node_modules'] },
    });
    expect(build).toBeCalled();
    expect(nuxtMock.listen).toBeCalledWith(3000);
    expect(output.success).toBe(true);
  });
});
