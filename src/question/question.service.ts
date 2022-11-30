import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(private prismaService: PrismaService) {}

  async getAllQuestions() {
    return this.prismaService.question.findMany({});
  }

  async CreateQuestion(question: CreateQuestionDto) {
    return await this.prismaService.question.create({
      data: {
        ...question,
      },
    });
  }

  async UpdateQuestion(id: number, update: UpdateQuestionDto) {
    return this.prismaService.question.update({
      where: {
        id,
      },
      data: {
        ...update,
      },
    });
  }
}
