import { Body, Controller, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller('answer')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Post()
  async createAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.craeteAnswer(createAnswerDto);
  }
}
