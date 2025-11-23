import { ArgumentMetadata, Logger, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

/**
 * @description Used for debugging requestToMiddleware params
 */
export class GlobalValidationPipe extends ValidationPipe {
  private readonly logger = new Logger(GlobalValidationPipe.name);

  constructor(options?: ValidationPipeOptions) {
    super(options);
  }

  async transform(value: unknown, metadata: ArgumentMetadata): Promise<unknown> {
    const transformed = await super.transform(value, metadata);
    this.logger.log(`Transformed request params ${JSON.stringify(transformed)}`);
    return transformed;
  }
}
