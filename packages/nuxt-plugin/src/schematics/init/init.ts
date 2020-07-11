import { chain, noop } from '@angular-devkit/schematics';
import {
  addDepsToPackageJson,
  addPackageWithInit,
  setDefaultCollection,
} from '@nrwl/workspace';
import { Schema } from './schema';

const updateDependencies = addDepsToPackageJson(
  {
    nuxt: '^2.13.3',
  },
  {}
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
