import {
  BuilderContext,
  BuilderOutput,
  createBuilder,
} from '@angular-devkit/architect';
import { Observable, defer } from 'rxjs';
import { BuildBuilderSchema } from './schema';
import { loadNuxt, build } from 'nuxt';

export function runBuilder(
  options: BuildBuilderSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return defer(async () => {
    try {
      const nuxt = await loadNuxt({ for: 'build' });
      await build(nuxt);
      context.logger.info('Builder ran for build');
      return { success: true };
    } catch (error) {
      console.error(error);
    }
  });
}

export default createBuilder(runBuilder);
