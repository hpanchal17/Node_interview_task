import { HttpStatus } from '@nestjs/common';

export enum ErrorCodes {
  InternalServerError = 1001,
  Unauthorized = 1002,
  AccountBan = 1003,
  ValidationFailed = 1004,
  BadRequest = 1005,
  EmailTaken = 1006,
  TokenExpire = 1007,
  NotFound = 1008,
  LoginRequired = 1009,
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Exceptions {
  export interface ErrorData {
    msg: string;
    code: number;
    report: boolean;
    statusCode: number;
  }

  export const DefaultError: ErrorData = {
    msg: 'errors.internalServer',
    code: ErrorCodes.InternalServerError,
    report: true,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  };

  export const Errors: {
    [index: number]: ErrorData;
  } = {
    [ErrorCodes.InternalServerError]: DefaultError,
    [ErrorCodes.Unauthorized]: {
      msg: 'errors.unauthorized',
      code: ErrorCodes.Unauthorized,
      report: false,
      statusCode: HttpStatus.UNAUTHORIZED,
    },
    [ErrorCodes.ValidationFailed]: {
      msg: 'errors.validation_failed',
      code: ErrorCodes.ValidationFailed,
      report: false,
      statusCode: HttpStatus.BAD_REQUEST,
    },
    [ErrorCodes.AccountBan]: {
      msg: 'errors.account_ban',
      code: ErrorCodes.AccountBan,
      report: false,
      statusCode: HttpStatus.BAD_REQUEST,
    },
    [ErrorCodes.BadRequest]: {
      msg: 'errors.bad_request',
      code: ErrorCodes.BadRequest,
      report: false,
      statusCode: HttpStatus.BAD_REQUEST,
    },
    [ErrorCodes.EmailTaken]: {
      msg: 'errors.email_taken',
      code: ErrorCodes.EmailTaken,
      report: false,
      statusCode: HttpStatus.BAD_REQUEST,
    },
    [ErrorCodes.TokenExpire]: {
      msg: 'errors.token_expire',
      code: ErrorCodes.TokenExpire,
      report: false,
      statusCode: HttpStatus.BAD_REQUEST,
    },
    [ErrorCodes.NotFound]: {
      msg: 'errors.not_found',
      code: ErrorCodes.NotFound,
      report: false,
      statusCode: HttpStatus.NOT_FOUND,
    },
    [ErrorCodes.LoginRequired]: {
      msg: 'errors.login_required',
      code: ErrorCodes.LoginRequired,
      report: false,
      statusCode: HttpStatus.UNAUTHORIZED,
    },
  };

  export const getErrorsData = (code: number): ErrorData => {
    if (Errors.hasOwnProperty(code)) {
      return Errors[code];
    }
    return DefaultError;
  };
}
