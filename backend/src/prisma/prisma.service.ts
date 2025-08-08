import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

type PrismaEvent = 'beforeExit' | 'query' | 'info' | 'warn' | 'error';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Use type assertion to handle the event type
    (this.$on as any)('beforeExit' as PrismaEvent, async () => {
      await app.close();
    });
  }
}
