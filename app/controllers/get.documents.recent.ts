import { VercelRequest, VercelResponse } from '@vercel/node';

export function makeRecentDocumentsHandler(params: { pageNumber: string }) {
  return function getRecentDocuments(
    request: VercelRequest,
    vercelResponse: VercelResponse
  ) {};
}
