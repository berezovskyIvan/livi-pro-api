import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { validateSync } from 'class-validator';
import { map } from 'rxjs/operators';
import type { Observable } from 'rxjs';

export type ModelValidationPredicate<TResponse> = (model: TResponse) => Promise<boolean> | boolean;

@Injectable()
export class ModelValidatorInterceptor<TResponse> implements NestInterceptor {
  private readonly logger = new Logger(ModelValidatorInterceptor.name);

  constructor(
    private readonly disableValidation: boolean,
    private readonly validator?: ModelValidationPredicate<TResponse>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<TResponse>): Observable<Promise<TResponse | TResponse[]>> {
    return next.handle().pipe(
      map(async (response) => {
        if (this.disableValidation) {
          this.logger.debug(`Validation is disabled for entity ${(JSON.stringify(response) ?? '').slice(0, 100)}...`);
          return response;
        }
        const predicate = this.validator !== null && this.validator !== undefined ? this.validator : validateModel;
        if (Array.isArray(response)) {
          const entities: TResponse[] = [];
          for (const entity of response) {
            let result: Promise<boolean> | boolean = predicate(entity);
            if (result instanceof Promise) {
              result = await result;
            }
            if (result) {
              entities.push(entity);
            }
          }
          return entities;
        }
        await predicate(response);
        return response;
      }),
    );
  }
}

export const validateModel = <T>(model: T): boolean => {
  const errors = validateSync(model as object, { forbidUnknownValues: false });
  return errors.length === 0;
};

export const modelValidator = <TResponse>(disableValidation: boolean, validatorPredicate?: ModelValidationPredicate<TResponse>) =>
  new ModelValidatorInterceptor<TResponse>(disableValidation, validatorPredicate);
