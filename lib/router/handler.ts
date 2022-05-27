import { VercelRequest, VercelResponse } from '@vercel/node';

export interface IHandler {
  handle: (request: VercelRequest, response: VercelResponse) => void;
}
