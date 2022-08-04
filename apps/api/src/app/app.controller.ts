import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('healthcheck')
  getData(): { status: string } {
    return { status: 'Running' };
  }
}
