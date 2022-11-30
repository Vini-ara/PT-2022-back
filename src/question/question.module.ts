import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
