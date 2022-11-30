import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EnsureAdminGuard } from '../auth/guard/ensure-admin.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllQuestions() {
    return this.questionService.getAllQuestions();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getQuestion(@Param('id') id: number) {
    return this.questionService.getQuestion(id);
  }

  @UseGuards(EnsureAdminGuard)
  @Post('craete')
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }
}
