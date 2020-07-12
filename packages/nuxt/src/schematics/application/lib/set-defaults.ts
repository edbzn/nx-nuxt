import { JsonObject } from '@angular-devkit/core';
import { noop, Rule } from '@angular-devkit/schematics';
import { updateWorkspace } from '@nrwl/workspace';
import { NormalizedSchema } from './normalize-options';

function jsonIdentity(x: any): JsonObject {
  return x as JsonObject;
}

export function setDefaults(options: NormalizedSchema): Rule {
  return options.skipWorkspaceJson
    ? noop()
    : updateWorkspace((workspace) => {
        workspace.extensions.schematics = jsonIdentity(
          workspace.extensions.schematics || {}
        );
        workspace.extensions.schematics['@vue'] =
          workspace.extensions.schematics['@vue'] || {};
        const prev = jsonIdentity(workspace.extensions.schematics['@vue']);

        workspace.extensions.schematics = {
          ...workspace.extensions.schematics,
          '@vue': {
            ...prev,
            application: {
              linter: options.linter,
              ...jsonIdentity(prev.application),
            },
          },
        };
      });
}
