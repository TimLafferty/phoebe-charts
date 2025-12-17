export function isErrorWithMessage(value: unknown): value is Error {
  return value instanceof Error;
}

