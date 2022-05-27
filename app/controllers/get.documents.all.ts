import { VercelRequest, VercelResponse } from '@vercel/node';
import type { HttpClient } from '../../lib/http-client';
import { IncorrectParametersError } from '../../lib/errors';

export function makeAllDocumentsHandler(params: {
  pageNumberKey: string;
  httpClient: HttpClient;
}) {
  return async function getAllDocuments(
    request: VercelRequest,
    response: VercelResponse
  ) {
    const pageNumber = Number.parseInt(params.pageNumberKey);
    if (Number.isNaN(pageNumber)) {
      const error = new IncorrectParametersError(
        `Incorrect pageNumber: ${params.pageNumberKey}`
      );
      response.status(error.HTTPCode).json(error);
    }
    const pages = await params.httpClient.documentsClient.getPagesByPageNumber(
      pageNumber
    );
  };
}
