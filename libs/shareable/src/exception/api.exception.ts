import { HttpException } from '@nestjs/common';
import { Exceptions } from '.';

export class ApiException extends HttpException {
  private data: { msg: any };
  private readonly errorData: Exceptions.ErrorData;

  constructor(code: number, data: any = {}) {
    const errorData = Exceptions.getErrorsData(code);
    super(data, errorData.statusCode);
    this.data = data;
    this.errorData = errorData;
  }

  getStatus(): number {
    return this.errorData.statusCode;
  }

  getMsg(): string {
    return this.data?.msg ?? this.errorData.msg;
  }

  getErrorCode(): number {
    return this.errorData.code;
  }
}
