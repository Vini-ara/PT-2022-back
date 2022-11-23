import { PickType } from '@nestjs/mapped-types';
import { UserEntity } from '../entity/user.entity';

export class UpdateUserArchivedDto extends PickType(UserEntity, ['archived']) {}
