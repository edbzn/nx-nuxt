import { chain, noop, Rule } from '@angular-devkit/schematics';
import {
  addDepsToPackageJson,
  addPackageWithInit,
  setDefaultCollection,
} from '@nrwl/workspace';
import { Schema } from './schema';

export default function (schema: Schema): Rule {
  return chain([
    setDefaultCollection('@vue/nuxt'),
    schema.unitTestRunner === 'jest'
      ? addPackageWithInit('@nrwl/jest')
      : noop(),
    schema.e2eTestRunner === 'cypress'
      ? addPackageWithInit('@nrwl/cypress')
      : noop(),
    addPackageWithInit('@nrwl/web', schema),
    addDepsToPackageJson(
      {
        nuxt: '^2.13.0',
        '@nuxt/typescript-runtime': '^1.0.0',
        'core-js': '^3.6.5',
      },
      {
        '@nuxt/babel-preset-app': '^2.13.3',
        '@nuxt/typescript-build': '^1.0.3',
        '@vue/test-utils': '^1.0.3',
        'babel-core': '7.0.0-bridge.0',
        'babel-jest': '^26.0.1',
        jest: '^26.0.1',
        'ts-jest': '^26.1.0',
        'vue-jest': '^3.0.4',
      }
    ),
  ]);
}
