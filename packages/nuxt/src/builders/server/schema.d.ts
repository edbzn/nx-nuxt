import { JsonObject } from '@angular-devkit/core';

export interface ServerBuilderSchema extends JsonObject {
  root: string;
  dev: boolean;
  outputPath: string;
  port?: number;
}
