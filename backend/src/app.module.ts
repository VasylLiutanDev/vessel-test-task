import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VesselModule } from './vessel/vessel.module';
import { EmissionsModule } from './emissions/emissions.module';
import { PPModule } from './pp/pp.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    VesselModule,
    EmissionsModule,
    PPModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
