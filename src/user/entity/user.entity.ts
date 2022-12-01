import { User } from '@prisma/client';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UserEntity implements User {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsBoolean()
  is_admin: boolean;

  @IsBoolean()
  archived: boolean;

  @IsDate()
  pdi_updated_at: Date;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  refreshToken: string;

  @IsNotEmpty()
  @IsString()
  picture: string;
}
