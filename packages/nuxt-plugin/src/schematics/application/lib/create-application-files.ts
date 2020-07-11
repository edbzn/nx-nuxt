import {
  apply,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  template,
  url,
} from '@angular-devkit/schematics';
import { names, offsetFromRoot } from '@nrwl/workspace';
import { NormalizedSchema } from './normalize-options';
import { createApp } from './create-application-files.helpers';

export function createApplicationFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files`), [
      template({
        ...names(options.name),
        ...options,
        tmpl: '',
        offsetFromRoot: offsetFromRoot(options.appProjectRoot),
        appContent: createApp(options.name),
      }),
      options.unitTestRunner === 'none'
        ? filter((file) => file !== `/specs/index.spec.tsx`)
        : noop(),
      move(options.appProjectRoot),
    ])
  );
}
