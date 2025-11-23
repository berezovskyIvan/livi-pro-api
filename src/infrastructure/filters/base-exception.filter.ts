import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import type { FastifyReply } from 'fastify';

export class ErrorData {
  static create({ message, code }: ErrorData) {
    const errorData = new ErrorData();
    errorData.code = code;
    errorData.message = message;
    return errorData;
  }

  @ApiProperty({
    description: 'Код ошибки',
    example: 'EXAMPLE_ERROR_CODE',
  })
  code: string;

  @ApiProperty({
    description: 'Сообщение об ошибке',
    example: 'Пример текста сообщения об ошибке',
  })
  message: string;
}

export class ApiError {
  @ApiProperty({ description: 'Данные об ошибке', type: [ErrorData] })
  errorData: ErrorData[];

  @ApiProperty({ description: 'Код ошибки', example: 400 })
  status: number;

  @ApiProperty({ description: 'Время ошибки' })
  timestamp: Date = new Date();

  constructor(status: number, errors: ErrorData[]) {
    this.errorData = errors;
    this.status = status;
  }
}

export class ApiException extends HttpException {
  private readonly code: string;

  constructor({ message, status, code }: { message: string; status: number; code: string }) {
    super(message, status);
    this.code = code;
  }

  public getCode() {
    return this.code;
  }
}

export abstract class BaseExceptionFilter implements ExceptionFilter {
  abstract extractErrors(error: Error): ApiError;

  catch(exception: Error, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const errors = this.extractErrors(exception);
    const response = context.getResponse<FastifyReply>();
    response.status(errors.status).send(errors);
  }
}
