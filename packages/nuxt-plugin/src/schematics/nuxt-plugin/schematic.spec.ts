import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { NuxtPluginSchematicSchema } from './schema';

describe('nuxt-plugin schematic', () => {
  let appTree: Tree;
  const options: NuxtPluginSchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@nx-nuxt-plugin/nuxt-plugin',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('nuxt-plugin', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
