import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { IHandler } from '../../lib/router';
import type { TagsService } from '../services/tags-service';

export class DocumentsByTagsHandler implements IHandler {
  public constructor(
    private readonly params: {
      tagsKey: string;
      tagsService: TagsService;
    }
  ) {}

  public async handle(request: VercelRequest, response: VercelResponse) {}
}
