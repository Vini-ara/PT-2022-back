import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private prismaService: PrismaService) {}

  async craeteAnswer(createAnswerDto: CreateAnswerDto) {
    return this.prismaService.answer.create({
      data: {
        ...createAnswerDto,
      },
    });
  }

  async findAsnwer(userId: string, questionId: number) {
    return this.prismaService.answer.findFirst({
      where: {
        userId,
        questionId,
      },
    });
  }
}
