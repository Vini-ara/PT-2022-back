import { Injectable } from '@nestjs/common';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { QuestionEntity } from '../entity/question.entity';

@Injectable()
export class UpdateQuestionDto extends PartialType(
  PickType(QuestionEntity, ['title', 'description']),
) {}
