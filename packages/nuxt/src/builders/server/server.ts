import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { resolve } from 'path';
import { from, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { loadNuxt } from '../../utils/load-nuxt';
import { ServerBuilderSchema } from './schema';

export function runBuilder(
  options: ServerBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return from(
    loadNuxt({
      for: options.dev ? 'dev' : 'start',
      port: options.port,
      projectRoot: resolve(context.workspaceRoot, options.root),
      buildDir: resolve(context.workspaceRoot, options.outputPath),
    })
  ).pipe(
    tap(() =>
      context.logger.info(
        `\n✅ ${
          options.dev ? 'Dev Server' : 'Server'
        } listening at http://localhost:${options.port} \n`
      )
    ),
    switchMap(
      () =>
        new Observable<BuilderOutput>((obs) => {
          obs.next({ success: true });
        })
    )
  );
}

export default createBuilder(runBuilder);
