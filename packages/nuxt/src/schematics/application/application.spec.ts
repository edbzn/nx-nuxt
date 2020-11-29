import { Tree } from '@angular-devkit/schematics';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { NxJson, readJsonInTree } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';

import { packageName } from '../../utils/consts';
import { runSchematic } from '../../utils/testing';

describe('app', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = Tree.empty();
    appTree = createEmptyWorkspace(appTree);
  });

  describe('not nested', () => {
    it('should update workspace.json', async () => {
      const tree = await runSchematic('app', { name: 'myApp' }, appTree);
      const workspaceJson = readJsonInTree(tree, '/workspace.json');

      expect(workspaceJson.projects['my-app'].root).toEqual('apps/my-app');
      expect(workspaceJson.projects['my-app-e2e'].root).toEqual(
        'apps/my-app-e2e'
      );
      expect(workspaceJson.defaultProject).toEqual('my-app');
    });

    it('should update nx.json', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', tags: 'one,two' },
        appTree
      );
      const nxJson = readJsonInTree<NxJson>(tree, '/nx.json');
      expect(nxJson.projects).toEqual({
        'my-app': {
          tags: ['one', 'two'],
        },
        'my-app-e2e': {
          tags: [],
          implicitDependencies: ['my-app'],
        },
      });
    });

    it('should generate files', async () => {
      const tree = await runSchematic('app', { name: 'myApp' }, appTree);
      expect(tree.exists('apps/my-app/tsconfig.json')).toBeTruthy();
      expect(tree.exists('apps/my-app/nuxt.config.js')).toBeTruthy();
      expect(tree.exists('apps/my-app/pages/index.vue')).toBeTruthy();
      expect(tree.exists('apps/my-app/layouts/default.vue')).toBeTruthy();
    });
  });

  it('should setup jest with ts support', async () => {
    const tree = await runSchematic(
      'app',
      {
        name: 'my-app',
      },
      appTree
    );

    expect(tree.readContent('apps/my-app/jest.config.js')).toContain(
      `moduleFileExtensions: ['ts', 'js', 'vue', 'json'],`
    );
    expect(tree.readContent('apps/my-app/jest.config.js')).toContain(
      `'^.+.ts$': 'ts-jest',`
    );
  });

  it('should set up the nrwl nuxt build builder', async () => {
    const tree = await runSchematic(
      'app',
      {
        name: 'my-app',
      },
      appTree
    );
    const workspaceJson = readJsonInTree(tree, 'workspace.json');
    const architectConfig = workspaceJson.projects['my-app'].architect;
    expect(architectConfig.build.builder).toEqual(packageName + ':build');
    expect(architectConfig.build.options).toEqual({
      root: 'apps/my-app',
      outputPath: 'dist/apps/my-app',
    });
  });

  it('should set up the nrwl nuxt server builder', async () => {
    const tree = await runSchematic(
      'app',
      {
        name: 'my-app',
      },
      appTree
    );
    const workspaceJson = readJsonInTree(tree, 'workspace.json');
    const architectConfig = workspaceJson.projects['my-app'].architect;
    expect(architectConfig.serve.builder).toEqual(packageName + ':serve');
    expect(architectConfig.serve.options).toEqual({
      root: 'apps/my-app',
    });
  });

  describe('--unit-test-runner none', () => {
    it('should not generate test configuration', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', unitTestRunner: 'none', e2eTestRunner: 'none' },
        appTree
      );
      expect(tree.exists('jest.config.js')).toBeFalsy();
      expect(tree.exists('apps/my-app/test/Logo.spec.js')).toBeFalsy();
    });
  });

  describe('--e2e-test-runner none', () => {
    it('should not generate test configuration', async () => {
      const tree = await runSchematic(
        'app',
        { name: 'myApp', e2eTestRunner: 'none' },
        appTree
      );
      expect(tree.exists('apps/my-app-e2e')).toBeFalsy();
      const workspaceJson = readJsonInTree(tree, 'workspace.json');
      expect(workspaceJson.projects['my-app-e2e']).toBeUndefined();
    });
  });

  describe('nuxt config options', () => {
    const isInNuxtConfig = (value: string, tree: UnitTestTree): boolean =>
      tree.readContent('apps/my-app/nuxt.config.js').includes(value);

    describe('mode', () => {
      it('should generate universal rendering mode configuration', async () => {
        const tree = await runSchematic(
          'app',
          { name: 'myApp', mode: 'universal' },
          appTree
        );
        expect(isInNuxtConfig("mode: 'universal',", tree)).toBeTruthy();
      });

      it('should generate spa rendering mode configuration', async () => {
        const tree = await runSchematic(
          'app',
          { name: 'myApp', mode: 'spa' },
          appTree
        );
        expect(isInNuxtConfig("mode: 'spa',", tree)).toBeTruthy();
      });

      it('should throw when unknown value is passed to rendering mode configuration', async () =>
        await expect(
          runSchematic('app', { name: 'myApp', mode: 'foo' }, appTree)
        ).rejects.toThrow());
    });

    describe('target', () => {
      it('should generate ssr configuration', async () => {
        const tree = await runSchematic(
          'app',
          { name: 'myApp', target: 'server' },
          appTree
        );
        expect(isInNuxtConfig("target: 'server',", tree)).toBeTruthy();
      });

      it('should generate static configuration', async () => {
        const tree = await runSchematic(
          'app',
          { name: 'myApp', target: 'static' },
          appTree
        );
        expect(isInNuxtConfig("target: 'static',", tree)).toBeTruthy();
      });

      it('should throw when unknown value is passed to target configuration', async () =>
        await expect(
          runSchematic('app', { name: 'myApp', target: 'foo' }, appTree)
        ).rejects.toThrow());
    });
  });
});
