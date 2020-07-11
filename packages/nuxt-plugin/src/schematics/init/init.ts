import { chain, noop } from '@angular-devkit/schematics';
import {
  addDepsToPackageJson,
  addPackageWithInit,
  setDefaultCollection,
} from '@nrwl/workspace';
import { Schema } from './schema';

const updateDependencies = addDepsToPackageJson(
  {
    nuxt: '^2.13.0',
    '@nuxt/typescript-runtime': '^0.4.10',
  },
  {
    '@nuxt/typescript-build': '^1.0.3',
    '@vue/test-utils': '^1.0.3',
    'babel-core': '7.0.0-bridge.0',
    'babel-jest': '^26.0.1',
    'vue-jest': '^3.0.4',
  }
);

export default function (schema: Schema) {
  return chain([
    setDefaultCollection('nx-nuxt-plugin'),
    schema.unitTestRunner === 'jest'
      ? addPackageWithInit('@nrwl/jest')
      : noop(),
    schema.e2eTestRunner === 'cypress'
      ? addPackageWithInit('@nrwl/cypress')
      : noop(),
    addPackageWithInit('nx-nuxt-plugin', schema),
    updateDependencies,
  ]);
}
