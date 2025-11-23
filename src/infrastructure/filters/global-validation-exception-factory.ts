import { loc } from 'src/infrastructure/locale/ru';
import { HttpException, ValidationError } from '@nestjs/common';

import { ErrorData } from './base-exception.filter';

export function globalValidationExceptionFactory(validationErrors: ValidationError[]): HttpException {
  return new RequestValidationException(validationErrors);
}

export class RequestValidationException extends HttpException {
  constructor(private readonly validationErrors: ValidationError[]) {
    super([], 400);
  }

  getResponse(): ErrorData[] {
    return this.validationErrors.map((error) => {
      const errorData = new ErrorData();
      const err = error.constraints;
      let messages: string[] = [];

      if (err) {
        messages = Object.values(err);
      }

      errorData.message = messages[0] ?? loc.errors.unknownValidationError(error.property);
      return errorData;
    });
  }

  getStatus(): number {
    return 400;
  }
}
