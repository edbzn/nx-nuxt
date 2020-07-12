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

export function createApplicationFiles(options: NormalizedSchema): Rule {
  return mergeWith(
    apply(url(`./files`), [
      template({
        ...names(options.name),
        ...options,
        tmpl: '',
        offsetFromRoot: offsetFromRoot(options.appProjectRoot),
      }),
      options.unitTestRunner === 'none'
        ? filter((file) => file !== `/test/Logo.spec.js`)
        : noop(),
      move(options.appProjectRoot),
    ])
  );
}
