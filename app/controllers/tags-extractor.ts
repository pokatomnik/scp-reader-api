import { VercelRequestQuery } from '@vercel/node';
import { IParamsExtractor } from '../../lib/router/params-extractor';

export class TagsExtractor implements IParamsExtractor<Array<string>> {
  public constructor(private readonly key: string) {}

  public extract(query: VercelRequestQuery): Array<string> {
    const tagsStr = query[this.key]?.toString();
    if (tagsStr === undefined) {
      throw new Error(`No tags specified`);
    }

    const tagNames = tagsStr.split('|').filter(Boolean);
    if (tagNames.length === 0) {
      throw new Error('Tags are empty');
    }

    return tagNames;
  }
}
