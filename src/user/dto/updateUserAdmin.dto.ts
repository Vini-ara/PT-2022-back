import { PickType } from '@nestjs/mapped-types';
import { UserEntity } from '../entity/user.entity';

export class UpdateUserAdminDto extends PickType(UserEntity, ['is_admin']) {}
