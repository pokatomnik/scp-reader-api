import { VercelRequest, VercelResponse } from '@vercel/node';

export function makeTagsHandler() {
  return function getTags(
    request: VercelRequest,
    vercelResponse: VercelResponse
  ) {};
}
