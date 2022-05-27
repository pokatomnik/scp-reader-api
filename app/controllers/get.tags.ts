import type { VercelResponse } from '@vercel/node';
import type { IHandler } from '../../lib/router';
import { TagsFetchError } from '../errors';
import type { TagsService } from '../services/tags-service';

export class TagsHandler implements IHandler {
  public constructor(private readonly params: { tagsService: TagsService }) {}

  public async handle(_: unknown, response: VercelResponse) {
    try {
      const tags = this.params.tagsService.getTags();
      response.json(tags);
    } catch (e) {
      const error = new TagsFetchError(e instanceof Error ? e : new Error('Failed to fetch tags'));
      response.status(error.HTTPCode).json(error);
    }
  }
}
