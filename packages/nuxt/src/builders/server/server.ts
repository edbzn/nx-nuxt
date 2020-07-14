import {
  BuilderOutput,
  createBuilder,
  BuilderContext,
} from '@angular-devkit/architect';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ServerBuilderSchema } from './schema';
import { loadNuxt } from '../../utils/load-nuxt';
import { resolve } from 'path';

export function runBuilder(
  options: ServerBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return from(
    loadNuxt({
      for: 'dev',
      port: options.port,
      projectRoot: resolve(context.workspaceRoot, options.root),
    })
  ).pipe(
    tap(() =>
      context.logger.info(
        `\n Dev Server listening at http://localhost:${options.port} \n`
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
