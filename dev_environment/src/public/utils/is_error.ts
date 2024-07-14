import { HttpFetchError } from '../../../../src/core/public';

export function isError<T>(error: T | HttpFetchError): error is HttpFetchError {
  return error instanceof HttpFetchError;
}
