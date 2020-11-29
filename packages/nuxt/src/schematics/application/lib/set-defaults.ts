import { JsonObject } from '@angular-devkit/core';
import { noop, Rule } from '@angular-devkit/schematics';
import { updateWorkspace } from '@nrwl/workspace';

import { packageName } from '../../../utils/consts';
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
        workspace.extensions.schematics[packageName] =
          workspace.extensions.schematics[packageName] || {};
        const prev = jsonIdentity(workspace.extensions.schematics[packageName]);

        workspace.extensions.schematics = {
          ...workspace.extensions.schematics,
          [packageName]: {
            ...prev,
            application: {
              linter: options.linter,
              unitTestRunner: options.unitTestRunner,
              e2eTestRunner: options.e2eTestRunner,
              ...jsonIdentity(prev.application),
            },
          },
        };
      });
}
