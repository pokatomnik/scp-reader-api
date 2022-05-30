import { VercelRequestQuery } from '@vercel/node';

export interface IParamsExtractor<T> {
  extract(query: VercelRequestQuery): T;
}
