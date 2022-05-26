import { VercelRequest, VercelResponse } from '@vercel/node';

export function makeAllDocumentsHandler(params: { pageNumber: string }) {
  return function getAllDocuments(
    request: VercelRequest,
    vercelResponse: VercelResponse
  ) {};
}
