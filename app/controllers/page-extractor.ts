import { VercelRequestQuery } from '@vercel/node';
import type { IParamsExtractor } from '../../lib/router/params-extractor';

export class PageNumberExtractor implements IParamsExtractor<number> {
  public constructor(private readonly name: string) {}

  public extract(query: VercelRequestQuery): number {
    const valueStr = query[this.name];

    if (valueStr === undefined) {
      throw new Error('No values passed');
    }

    if (Array.isArray(valueStr)) {
      throw new Error('Multiple values passed');
    }

    const valueNumber = Number.parseInt(valueStr);

    if (Number.isNaN(valueNumber)) {
      throw new Error(`Incorrect page number ${valueStr}`);
    }

    if (Math.round(valueNumber) !== valueNumber) {
      throw new Error('Page number is not integer');
    }

    return valueNumber;
  }
}
