import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsNotBlank', async: false })
class IsNotBlankConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    return typeof value === 'string' && value.trim().length > 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should not be empty`;
  }
}

const blankFunctions = function (object: object, propertyName: string) {
  registerDecorator({
    target: object.constructor,
    propertyName,
    constraints: [],
    options: {},
    validator: IsNotBlankConstraint,
  });
};

export function IsNotBlank() {
  return blankFunctions;
}
