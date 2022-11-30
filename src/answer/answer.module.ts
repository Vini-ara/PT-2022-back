import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AnswerService } from './answer.service';

@Module({
  imports: [PrismaModule],
  providers: [AnswerService],
  controllers: [],
})
export class AnswerModule {}
