import { PickType } from '@nestjs/mapped-types';
import { AnswerEntity } from '../entity/answer.entity';

export class CreateAnswerDto extends PickType(AnswerEntity, [
  'userId',
  'questionId',
  'content',
]) {}
