import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  @Get('health')
  @ApiOperation({ summary: 'Перевірка стану сервісу' })
  @ApiResponse({ status: 200, description: 'Сервіс працює у штатному режимі' })
  getHealth(): { status: string } {
    return { status: 'ok' };
  }
}
