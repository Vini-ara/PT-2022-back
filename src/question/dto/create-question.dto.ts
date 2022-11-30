import { PickType } from '@nestjs/mapped-types';
import { QuestionEntity } from '../entity/question.entity';

export class CreateQuestionDto extends PickType(QuestionEntity, [
  'title',
  'description',
]) {}
