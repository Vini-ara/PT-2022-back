import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

@Module({
  imports: [PrismaModule],
  providers: [AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule {}
