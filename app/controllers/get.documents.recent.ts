import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { IHandler } from '../../lib/router';
import type { DocumentsService } from '../services/documents-services';

export class RecentDocumentsHandler implements IHandler {
  public constructor(
    private readonly params: {
      pageNumberKey: string;
      documentsService: DocumentsService;
    }
  ) {}

  public async handle(request: VercelRequest, response: VercelResponse) {}
}
