import { Question } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class QuestionEntity implements Question {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsBoolean()
  archived: boolean;

  @IsString()
  description: string;

  @IsDate()
  updatedAt: Date;
}
