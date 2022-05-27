import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { IHandler } from '../../lib/router';
import { IncorrectParametersError, TagsFetchError } from '../errors';
import type { TagsService } from '../services/tags-service';

export class DocumentsByTagsHandler implements IHandler {
  public constructor(
    private readonly params: {
      tagsKey: string;
      tagsService: TagsService;
    }
  ) {}

  public async handle(request: VercelRequest, response: VercelResponse) {
    const tagsStr = request.query[this.params.tagsKey]?.toString();
    if (tagsStr === undefined) {
      const error = new IncorrectParametersError(`Incorrect tags: ${tagsStr}`);
      return response.status(error.HTTPCode).json(error);
    }

    const tagNames = tagsStr.split('|').filter(Boolean);
    if (tagNames.length === 0) {
      const error = new IncorrectParametersError('Tags are empty');
      return response.status(error.HTTPCode).json(error);
    }

    try {
      const pagesByTags = await this.params.tagsService.getDocumentsByTags(tagNames);
      response.json(pagesByTags);
    } catch (e) {
      const error = new TagsFetchError(e instanceof Error ? e : new Error('Failed to fetch tags'));
      response.status(error.HTTPCode).json(error);
    }
  }
}
