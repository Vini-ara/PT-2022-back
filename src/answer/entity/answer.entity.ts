import { Answer } from '@prisma/client';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AnswerEntity implements Answer {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  questionId: number;

  @IsString()
  content: string;

  @IsDate()
  updatedAt: Date;
}
