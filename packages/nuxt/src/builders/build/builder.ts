import { BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { BuildBuilderSchema } from './schema';
import { loadNuxt } from '../../utils/load-nuxt';

export function runBuilder(
  options: BuildBuilderSchema
): Observable<BuilderOutput> {
  return from(
    loadNuxt({
      for: 'build',
      projectRoot: options.root,
    })
  ).pipe(map(() => ({ success: true })));
}

export default createBuilder(runBuilder);
