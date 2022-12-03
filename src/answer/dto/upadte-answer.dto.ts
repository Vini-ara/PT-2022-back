import { PickType } from '@nestjs/mapped-types';
import { AnswerEntity } from '../entity/answer.entity';

export class UpdateAnswerDto extends PickType(AnswerEntity, ['content']) {}
