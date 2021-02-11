import { Response } from "express";
import {
  AuthFailureResponse,
  AccessTokenErrorResponse,
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ForbiddenResponse,
} from "./ApiResponse";

/**
 *
 *
 * @enum {number}
 */
enum ErrorType {
  BAD_TOKEN = "BadTokenError",
  TOKEN_EXPIRED = "TokenExpiredError",
  UNAUTHORIZED = "AuthFailureError",
  ACCESS_TOKEN = "AccessTokenError",
  INTERNAL = "InternalError",
  NOT_FOUND = "NotFoundError",
  NO_ENTRY = "NoEntryError",
  NO_DATA = "NoDataError",
  BAD_REQUEST = "BadRequestError",
  FORBIDDEN = "ForbiddenError",
}

/**
 *
 *
 * @export
 * @abstract
 * @class ApiError
 * @extends {Error}
 */
export abstract class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   * @param {ErrorType} type
   * @param {string} [message="error"]
   * @memberof ApiError
   */
  constructor(public type: ErrorType, public message: string = "error") {
    super(type);
  }

  /**
   *
   *
   * @static
   * @param {ApiError} err
   * @param {Response} res
   * @return {*}  {Response}
   * @memberof ApiError
   */
  public static handle(err: ApiError, res: Response): Response {
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(err.message).send(res);
      case ErrorType.ACCESS_TOKEN:
        return new AccessTokenErrorResponse(err.message).send(res);
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message).send(res);
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
      case ErrorType.NO_DATA:
        return new NotFoundResponse(err.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(err.message).send(res);
      default: {
        return new InternalErrorResponse("Something wrong happened.").send(res);
      }
    }
  }
}

/**
 *
 *
 * @export
 * @class AuthFailureError
 * @extends {ApiError}
 */
export class AuthFailureError extends ApiError {
  constructor(message = "Invalid Credentials") {
    super(ErrorType.UNAUTHORIZED, message);
  }
}

/**
 *
 *
 * @export
 * @class InternalError
 * @extends {ApiError}
 */
export class InternalError extends ApiError {
  constructor(message = "Internal error") {
    super(ErrorType.INTERNAL, message);
  }
}

/**
 *
 *
 * @export
 * @class BadRequestError
 * @extends {ApiError}
 */
export class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(ErrorType.BAD_REQUEST, message);
  }
}

/**
 *
 *
 * @export
 * @class NotFoundError
 * @extends {ApiError}
 */
export class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(ErrorType.NOT_FOUND, message);
  }
}

/**
 *
 *
 * @export
 * @class ForbiddenError
 * @extends {ApiError}
 */
export class ForbiddenError extends ApiError {
  constructor(message = "Permission denied") {
    super(ErrorType.FORBIDDEN, message);
  }
}

/**
 *
 *
 * @export
 * @class NoEntryError
 * @extends {ApiError}
 */
export class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists") {
    super(ErrorType.NO_ENTRY, message);
  }
}

/**
 *
 *
 * @export
 * @class BadTokenError
 * @extends {ApiError}
 */
export class BadTokenError extends ApiError {
  constructor(message = "Token is not valid") {
    super(ErrorType.BAD_TOKEN, message);
  }
}

/**
 *
 *
 * @export
 * @class TokenExpiredError
 * @extends {ApiError}
 */
export class TokenExpiredError extends ApiError {
  constructor(message = "Token is expired") {
    super(ErrorType.TOKEN_EXPIRED, message);
  }
}

/**
 *
 *
 * @export
 * @class NoDataError
 * @extends {ApiError}
 */
export class NoDataError extends ApiError {
  constructor(message = "No data available") {
    super(ErrorType.NO_DATA, message);
  }
}

/**
 *
 *
 * @export
 * @class AccessTokenError
 * @extends {ApiError}
 */
export class AccessTokenError extends ApiError {
  constructor(message = "Invalid access token") {
    super(ErrorType.ACCESS_TOKEN, message);
  }
}
