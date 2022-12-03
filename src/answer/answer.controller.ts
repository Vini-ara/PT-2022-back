import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/upadte-answer.dto';

@Controller('answer')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    const answer = await this.answerService.findAsnwer(
      createAnswerDto.userId,
      createAnswerDto.questionId,
    );

    if (!answer) return this.answerService.craeteAnswer(createAnswerDto);

    const updateAnswerDto: UpdateAnswerDto = {
      content: answer.content,
    };

    return this.answerService.updateAnswer(answer.id, updateAnswerDto);
  }
}
