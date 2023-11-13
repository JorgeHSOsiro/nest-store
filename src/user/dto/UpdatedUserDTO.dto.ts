import { UserDTO } from './UserDTO.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatedUserDTO extends PartialType(UserDTO) {}
