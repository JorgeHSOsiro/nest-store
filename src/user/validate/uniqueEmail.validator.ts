import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({
  async: true,
})
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: any): Promise<boolean> {
    try {
      const userEmailFound = await this.userService.emailSearch(value);

      return !userEmailFound;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return true;
      }

      throw error;
    }
  }
}

export const IsUniqueEmail = (validationOptions: ValidationOptions) => {
  return (object: Object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
