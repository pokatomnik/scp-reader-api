import { VercelRequest, VercelResponse } from '@vercel/node';

export function makeRecentDocumentsHandler(params: { pageNumberKey: string }) {
  return function getRecentDocuments(
    request: VercelRequest,
    vercelResponse: VercelResponse
  ) {};
}
