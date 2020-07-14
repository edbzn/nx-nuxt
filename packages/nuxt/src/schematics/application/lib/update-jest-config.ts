import { noop, Rule } from '@angular-devkit/schematics';
import { NormalizedSchema } from './normalize-options';

export function updateJestConfig(options: NormalizedSchema): Rule {
  return options.unitTestRunner === 'none'
    ? noop()
    : (host) => {
        const configPath = `${options.appProjectRoot}/jest.config.js`;
        const content = `
          module.exports = {
            preset: '../../jest.config.js',
            moduleNameMapper: {
              '^@/(.*)$': '<rootDir>/$1',
              '^~/(.*)$': '<rootDir>/$1',
              '^vue$': 'vue/dist/vue.common.js',
            },
            moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
            transform: {
              '^.+.ts$': 'ts-jest',
              '.*.(vue)$': 'vue-jest',
            },
            collectCoverage: true,
            collectCoverageFrom: [
              '<rootDir>/components/**/*.vue',
              '<rootDir>/pages/**/*.vue',
            ],
          };`;

        host.overwrite(configPath, content);
      };
}
