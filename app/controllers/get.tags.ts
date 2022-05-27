import { VercelRequest, VercelResponse } from '@vercel/node';
import type { HttpClient } from '../../lib/http-client';

export function makeTagsHandler(params: { httpClient: HttpClient }) {
  return function getTags(
    request: VercelRequest,
    vercelResponse: VercelResponse
  ) {};
}
