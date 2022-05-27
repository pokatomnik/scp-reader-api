import { VercelRequest, VercelResponse } from '@vercel/node';

export function makeDocumentsByTagsHandler(params: { tagsKey: string }) {
  return function getDocumentsByTags(
    request: VercelRequest,
    vercelResponse: VercelResponse
  ) {};
}
