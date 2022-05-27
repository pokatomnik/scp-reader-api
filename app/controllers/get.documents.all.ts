import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { IHandler } from '../../lib/router';
import { DocumentsFetchError, IncorrectParametersError } from '../errors';
import type { DocumentsService } from '../services/documents-services';

export class DocumentsHandler implements IHandler {
  public constructor(
    private readonly params: {
      pageNumberKey: string;
      documentsService: DocumentsService;
    }
  ) {}

  public async handle(request: VercelRequest, response: VercelResponse) {
    const pageNumberStr = request.query[this.params.pageNumberKey]?.toString();
    if (pageNumberStr === undefined) {
      const error = new IncorrectParametersError(`Incorrect pageNumber: ${pageNumberStr}`);
      return response.status(error.HTTPCode).json(error);
    }

    const pageNumber = Number.parseInt(pageNumberStr);
    if (Number.isNaN(pageNumber)) {
      const error = new IncorrectParametersError(`Incorrect pageNumber: ${pageNumberStr}`);
      return response.status(error.HTTPCode).json(error);
    }

    try {
      const pages = await this.params.documentsService.getPagesByPageNumber(pageNumber);
      response.json(pages);
    } catch (e) {
      const error = new DocumentsFetchError(
        e instanceof Error ? e : new Error('Failed to fetch documents')
      );
      response.status(error.HTTPCode).json(error);
    }
  }
}
