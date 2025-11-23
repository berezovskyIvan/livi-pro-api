import { HttpStatus } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthCheckModule } from '../../src/health-check/health-check.module';

describe('HealthCheckController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthCheckModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  describe('/check (GET)', () => {
    it('should successfully return true value', () => {
      return app
        .inject({
          method: 'GET',
          url: 'check',
        })
        .then((result) => {
          expect(result.statusCode).toEqual(HttpStatus.OK);
          expect(result.json().ok).toBeTruthy();
        });
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
