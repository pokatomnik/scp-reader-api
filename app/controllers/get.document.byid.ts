import { HttpClient } from '../../lib/http-client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { NotFoundError } from '../../lib/errors';
import httpProxyMiddleware from 'next-http-proxy-middleware';

export function makeDocumentHandler(params: {
  pageIdKey: string;
  httpClient: HttpClient;
}) {
  return function (request: VercelRequest, response: VercelResponse) {
    const pageId = request.query[params.pageIdKey]?.toString();

    if (!pageId) {
      const error = new NotFoundError('Document does not exist');
      return response.status(error.HTTPCode).json(error);
    }

    const nextRequest = request as NextApiRequest;
    const nextResponse = response as unknown as NextApiResponse;

    return httpProxyMiddleware(nextRequest, nextResponse, {
      target: params.httpClient.documentsClient.getPageUrl(pageId),
    });
  };
}
