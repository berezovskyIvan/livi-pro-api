import { Controller, Get } from '@nestjs/common';

class HealthCheckResponse {
  ok: boolean;
}

@Controller()
export class HealthCheckController {
  @Get('check')
  check(): HealthCheckResponse {
    return { ok: true };
  }
}
