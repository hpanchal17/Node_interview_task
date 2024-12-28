import { HttpException } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(message: any) {
    super(message, 422);
  }
}
