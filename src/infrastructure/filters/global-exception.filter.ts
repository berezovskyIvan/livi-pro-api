import { Cast } from '../utils/cast';
import { loc } from 'src/infrastructure/locale/ru';
import { ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { ApiError, ApiException, BaseExceptionFilter, ErrorData } from './base-exception.filter';
import { RequestValidationException } from './global-validation-exception-factory';
import type { FastifyReply, FastifyRequest } from 'fastify';

export class GlobalExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const context = host.switchToHttp();
    const response = context.getResponse<FastifyReply>();
    const apiError = this.extractErrors(exception);
    this.logger.error(
      {
        ...apiError,
        body: request.body,
        headers: request.headers,
        method: request.method,
        path: request.url,
      },
      '',
    );
    response.status(apiError.status).send(apiError);
  }

  extractErrors(error: Error): ApiError {
    let message = error.message ?? loc.errors.unknownError;
    const dynamicError = error as Error & {
      response?: {
        data?: {
          result?: unknown;
          message?: unknown;
        };
        status?: number;
        statusCode?: number;
      };
      code?: string;
      status?: number;
      statusCode?: number;
    };
    let errorObject: unknown = dynamicError.response?.data?.result ?? dynamicError.response?.data?.message ?? dynamicError.response?.data;
    const dynamicErrorCode = dynamicError?.code || '';
    let code = dynamicErrorCode ?? '';

    if (errorObject) {
      try {
        if (typeof errorObject === 'object' && errorObject !== null && 'message' in errorObject) {
          const errorWithMessage = errorObject as { message: unknown };
          if (errorWithMessage.message !== null && errorWithMessage.message !== undefined) {
            errorObject = errorWithMessage.message;
          }
        }
        message = typeof errorObject === 'string' ? errorObject : JSON.stringify(errorObject);
      } catch (e) {
        this.logger.error(`Error thrown when parse backend exception ${e}`, e.stack);
        message = String(errorObject);
      }
    }

    let status = Cast.toInt(
      dynamicError.response?.status ?? dynamicError.response?.statusCode ?? dynamicError.status ?? dynamicError.statusCode ?? 500,
    );
    if (error instanceof HttpException) {
      status = error.getStatus();
    }
    if (error instanceof ApiException) {
      code = error.getCode() ?? '';
    }
    if (error instanceof RequestValidationException) {
      const errors = error.getResponse();

      return new ApiError(status, errors);
    }

    return new ApiError(status, [{ message, code }]);
  }

  protected generateError({ status, code, message }: { status: number; code: string; message: string }): ApiError {
    return new ApiError(status, [ErrorData.create({ code, message })]);
  }
}
