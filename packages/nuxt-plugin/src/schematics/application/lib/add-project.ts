import { join, normalize } from '@angular-devkit/core';
import { Rule } from '@angular-devkit/schematics';
import { generateProjectLint } from '@nrwl/workspace';
import { updateWorkspaceInTree } from '@nrwl/workspace/src/utils/ast-utils';
import { NormalizedSchema } from './normalize-options';

export function addProject(options: NormalizedSchema): Rule {
  return updateWorkspaceInTree((json) => {
    const architect: { [key: string]: any } = {};
    architect.build = {
      builder: 'nx-nuxt-plugin:build',
      options: {
        root: options.appProjectRoot,
        outputPath: join(normalize('dist'), options.appProjectRoot),
      },
      // This has to be here so `nx serve [app] --prod` will work. Otherwise
      // a missing configuration error will be thrown.
      configurations: {
        production: {},
      },
    };

    architect.serve = {
      builder: 'nx-nuxt-plugin:server',
      options: {
        buildTarget: `${options.projectName}:build`,
        dev: true,
      },
      configurations: {
        production: {
          buildTarget: `${options.projectName}:build:production`,
          dev: false,
        },
      },
    };

    architect.export = {
      builder: 'nx-nuxt-plugin:export',
      options: {
        buildTarget: `${options.projectName}:build:production`,
      },
    };

    architect.lint = generateProjectLint(
      normalize(options.appProjectRoot),
      join(normalize(options.appProjectRoot), 'tsconfig.json'),
      options.linter
    );

    json.projects[options.projectName] = {
      root: options.appProjectRoot,
      sourceRoot: options.appProjectRoot,
      projectType: 'application',
      schematics: {},
      architect,
    };

    json.defaultProject = json.defaultProject || options.projectName;

    return json;
  });
}
