import type { VercelRequest, VercelResponse } from '@vercel/node';
import { IncorrectParametersError } from '../../lib/errors';
import type { IHandler } from '../../lib/router';
import type { DocumentsService } from '../services/documents-services';

export class DocumentsHandler implements IHandler {
  public constructor(
    private readonly params: {
      pageNumberKey: string;
      documentsService: DocumentsService;
    }
  ) {}

  public async handle(request: VercelRequest, response: VercelResponse) {
    const pageNumber = Number.parseInt(this.params.pageNumberKey);
    if (Number.isNaN(pageNumber)) {
      const error = new IncorrectParametersError(
        `Incorrect pageNumber: ${this.params.pageNumberKey}`
      );
      response.status(error.HTTPCode).json(error);
    }
    const pages = await this.params.documentsService.getPagesByPageNumber(pageNumber);
  }
}
