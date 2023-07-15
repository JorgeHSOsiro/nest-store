import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { IsUniqueEmail } from '../validate/uniqueEmail.validator';

export class UpdatedUserDTO {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsEmail(undefined, { message: 'O email informado é invalido.' })
  @IsUniqueEmail({ message: 'Já existe um usuario com este email' })
  email: string;

  @IsOptional()
  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  password: string;
}
