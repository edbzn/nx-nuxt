import {
  chain,
  externalSchematic,
  noop,
  Rule,
} from '@angular-devkit/schematics';
import { addDepsToPackageJson, addPackageWithInit } from '@nrwl/workspace';

import { NormalizedSchema } from './normalize-options';

export function addJest(options: NormalizedSchema): Rule {
  return options.unitTestRunner === 'jest'
    ? chain([
        addPackageWithInit('@nrwl/jest'),
        externalSchematic('@nrwl/jest', 'jest-project', {
          project: options.projectName,
          setupFile: 'none',
          skipSerializers: true,
          supportTsx: false,
          testEnvironment: 'jsdom',
          babelJest: false,
        }),
        addDepsToPackageJson(
          {},
          {
            'vue-jest': '^3.0.4',
            '@vue/test-utils': '^1.1.3',
            'babel-core': '^7.0.0-bridge.0',
          }
        ),
      ])
    : noop();
}
