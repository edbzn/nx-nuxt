import {
  BuilderOutput,
  createBuilder,
  BuilderContext,
} from '@angular-devkit/architect';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { BuildBuilderSchema } from './schema';
import { loadNuxt } from '../../utils/load-nuxt';
import { resolve } from 'path';

export function runBuilder(
  options: BuildBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return from(
    loadNuxt({
      for: 'build',
      outputPath: resolve(context.workspaceRoot, options.outputPath),
      projectRoot: resolve(context.workspaceRoot, options.root),
    })
  ).pipe(map(() => ({ success: true })));
}

export default createBuilder(runBuilder);
