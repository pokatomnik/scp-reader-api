import { VercelRequest, VercelResponse } from '@vercel/node';

export function makeDocumentsByTagsHandler(params: { tags: string }) {
  return function getDocumentsByTags(
    request: VercelRequest,
    vercelResponse: VercelResponse
  ) {};
}
