import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { IHandler } from '../../lib/router';
import type { IParamsExtractor } from '../../lib/router/params-extractor';
import { DocumentsFetchError, IncorrectParametersError } from '../errors';
import type { DocumentsService } from '../services/documents-services';

export class RecentDocumentsHandler implements IHandler {
  public constructor(
    private readonly params: {
      pageNumberExtractor: IParamsExtractor<number>;
      documentsService: DocumentsService;
    }
  ) {}

  public async handle(request: VercelRequest, response: VercelResponse) {
    let pageNumber: number;
    try {
      pageNumber = this.params.pageNumberExtractor.extract(request.query);
    } catch (e) {
      const originalError = e instanceof Error ? e : new Error('Incorrect page number');
      const error = new IncorrectParametersError(originalError.message);
      return response.status(error.HTTPCode).json(error);
    }

    try {
      const pages = await this.params.documentsService.getRecentPagesByPageNumber(pageNumber);
      response.json(pages);
    } catch (e) {
      const error = new DocumentsFetchError(
        e instanceof Error ? e : new Error('Failed to fetch documents')
      );
      response.status(error.HTTPCode).json(error);
    }
  }
}
