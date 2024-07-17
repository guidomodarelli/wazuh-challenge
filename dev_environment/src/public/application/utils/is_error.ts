import { HttpFetchError } from '../../../../../src/core/public';

/**
 * The function `isError` checks if the input is an instance of `HttpFetchError`.
 * @returns a boolean value indicating whether the `error` parameter is an instance of `HttpFetchError`.
 */
export function isError<T>(error: T | HttpFetchError): error is HttpFetchError {
  return error instanceof HttpFetchError;
}
