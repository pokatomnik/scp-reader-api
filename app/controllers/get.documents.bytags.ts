import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { IHandler } from '../../lib/router';
import { IParamsExtractor } from '../../lib/router/params-extractor';
import { IncorrectParametersError, TagsFetchError } from '../errors';
import type { TagsService } from '../services/tags-service';

export class DocumentsByTagsHandler implements IHandler {
  public constructor(
    private readonly params: {
      tagsExtractor: IParamsExtractor<Array<string>>;
      tagsService: TagsService;
    }
  ) {}

  public async handle(request: VercelRequest, response: VercelResponse) {
    let tagNames: Array<string>;
    try {
      tagNames = this.params.tagsExtractor.extract(request.query);
    } catch (e) {
      const originalError = e instanceof Error ? e : new Error('Incorrect tags');
      const error = new IncorrectParametersError(originalError.message);
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
