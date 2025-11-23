import { globalValidationExceptionFactory } from './filters/global-validation-exception-factory';
import type { ValidationPipeOptions } from '@nestjs/common';

export const GLOBAL_VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  transform: true,
  skipMissingProperties: false,
  skipUndefinedProperties: false,
  skipNullProperties: false,
  disableErrorMessages: false,
  exceptionFactory: globalValidationExceptionFactory,
  whitelist: true,
  forbidUnknownValues: true,
};
