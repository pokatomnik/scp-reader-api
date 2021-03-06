import { HttpError } from '../lib/errors';

export class NotFoundError extends HttpError {
  public constructor(message: string) {
    super(404, 'NOT_FOUND', message);
  }
}

export class DocumentsFetchError extends HttpError {
  public constructor(original?: Error) {
    super(500, 'DOCUMENTS_FETCH_FAILED', original ? original.message : undefined);
  }
}

export class TagsFetchError extends HttpError {
  public constructor(original?: Error) {
    super(500, 'TAGS_FETCH_FAILED', original ? original.message : undefined);
  }
}

export class IncorrectParametersError extends HttpError {
  public constructor(message: string) {
    super(400, 'INCORRECT_PARAMETERS', message);
  }
}
