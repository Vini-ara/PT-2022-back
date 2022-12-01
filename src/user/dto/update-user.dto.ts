import { PartialType, PickType } from '@nestjs/mapped-types';
import { UserEntity } from '../entity/user.entity';

export class UpdateUserDto extends PartialType(
  PickType(UserEntity, ['id', 'name', 'picture', 'is_admin', 'archived']),
) {}
