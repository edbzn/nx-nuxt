import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { resolve } from 'path';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { loadNuxt } from '../../utils/load-nuxt';
import { BuildBuilderSchema } from './schema';

export function runBuilder(
  options: BuildBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return from(
    loadNuxt({
      for: 'build',
      buildDir: resolve(context.workspaceRoot, options.outputPath),
      projectRoot: resolve(context.workspaceRoot, options.root),
    })
  ).pipe(map(() => ({ success: true })));
}

export default createBuilder(runBuilder);
