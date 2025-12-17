import { HttpResponseInit } from '@azure/functions';
import { isErrorWithMessage } from './typeGuards';

export function badRequest(message: string, details?: unknown): HttpResponseInit {
  return {
    status: 400,
    jsonBody: { error: 'bad_request', message, details },
  };
}

export function internalServerError(message: string, error?: unknown): HttpResponseInit {
  return {
    status: 500,
    jsonBody: {
      error: 'internal_server_error',
      message,
      details: isErrorWithMessage(error) ? { message: error.message, name: error.name } : undefined,
    },
  };
}

