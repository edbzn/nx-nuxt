import {
  BuilderOutput,
  createBuilder,
  BuilderContext,
} from '@angular-devkit/architect';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
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
      projectRoot: resolve(context.workspaceRoot, options.root),
    })
  ).pipe(
    catchError((err) => {
      if (options.dev) {
        throw err;
      } else {
        throw new Error(
          `Could not start production server. Try building your app with \`nx build ${context.target.project}\`.`
        );
      }
    }),
    switchMap(
      () =>
        new Observable<BuilderOutput>((obs) => {
          obs.next({
            success: true,
          });
        })
    )
  );
}

export default createBuilder(runBuilder);
