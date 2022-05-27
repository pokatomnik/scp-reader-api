import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { IHandler } from '../../lib/router';
import type { TagsService } from '../services/tags-service';

export class TagsHandler implements IHandler {
  public constructor(params: { tagsService: TagsService }) {}

  public async handle(request: VercelRequest, response: VercelResponse) {}
}
