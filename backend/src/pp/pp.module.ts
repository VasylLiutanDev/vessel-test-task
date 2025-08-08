import { Module } from '@nestjs/common';
import { PPService } from './pp.service';
import { PPController } from './pp.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PPController],
  providers: [PPService],
  exports: [PPService],
})
export class PPModule {}
