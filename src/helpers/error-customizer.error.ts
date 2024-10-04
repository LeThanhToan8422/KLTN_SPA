// src/errors/custom-errors.ts

export default class ErrorCustomizer {
  code: string;
  message: string;
  status: number;

  constructor(code: string, message: string, status: number = 400) {
    this.code = code;
    this.message = message;
    this.status = status;
  }

  static BadRequestError(message: string = 'Bad Request') {
    return new ErrorCustomizer('400_BAD_REQUEST', message, 400);
  }

  static UnauthorizedError(message: string = 'Unauthorized') {
    return new ErrorCustomizer('401_UNAUTHORIZED', message, 401);
  }

  static ForbiddenError(message: string = 'Forbidden') {
    return new ErrorCustomizer('403_FORBIDDEN', message, 403);
  }

  static NotFoundError(message: string = 'Not Found') {
    return new ErrorCustomizer('404_NOT_FOUND', message, 404);
  }

  static PasswordIncorrectError(message: string = 'Password is incorrect') {
    return new ErrorCustomizer('401_PASSWORD_INCORRECT', message, 401);
  }

  static InternalServerError(message: string = 'Internal Server Error') {
    return new ErrorCustomizer('500_INTERNAL_SERVER_ERROR', message, 500);
  }

  static CustomError(code: string, message: string, status: number = 400) {
    return new ErrorCustomizer(code, message, status);
  }
}
