import { fastifyMultipart } from '@fastify/multipart';
import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as packageJson from '../package.json';
import { AppModule } from './app.module';
import { Config } from './config';
import { GlobalExceptionFilter } from './infrastructure/filters/global-exception.filter';
import { GlobalValidationPipe } from './infrastructure/pipes/global-validation.pipe';
import { GLOBAL_VALIDATION_PIPE_OPTIONS } from './infrastructure/variables';

async function bootstrap() {
  try {
    const fastifyAdapter = new FastifyAdapter({
      maxParamLength: 1000,
      bodyLimit: 6990506, // 6.(6)MiB
    });

    fastifyAdapter.getInstance();

    const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter, {
      abortOnError: false,
    });

    await app.register(fastifyMultipart);

    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalPipes(new GlobalValidationPipe(GLOBAL_VALIDATION_PIPE_OPTIONS));
    app.enableCors();

    const options = new DocumentBuilder()
      .setTitle('Livi-pro - OpenAPI')
      .setVersion(packageJson.version)
      .setDescription('Документация к API приложения "Livi-pro"')
      .addBearerAuth({ type: 'http' }, 'bearer')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    const swaggerOptions = {
      displayOperationId: true,
      filter: true,
      displayRequestDuration: true,
    };
    SwaggerModule.setup('docs', app, document, { swaggerOptions });

    await app.listen(Config.port, '0.0.0.0');
  } catch (err) {
    new ConsoleLogger().error(err, err.stack, 'main.ts');
  }
}

void bootstrap();
