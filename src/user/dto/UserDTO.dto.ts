import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { IsUniqueEmail } from '../validate/uniqueEmail.validator';

export class UserDTO {
  @IsNotEmpty({
    message: 'O nome não pode ser vazio.',
  })
  name: string;

  @IsEmail(undefined, { message: 'O email informado é invalido.' })
  @IsUniqueEmail({ message: 'Já existe um usuario com este email' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  password: string;
}
