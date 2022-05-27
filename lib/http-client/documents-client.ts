import type { AxiosInstance } from 'axios';
import type { IDocument } from '../../domain/document';
import { DocumentsFetchError } from '../../lib/errors';

export class DocumentsClient {
  public constructor(
    private readonly params: {
      axios: AxiosInstance;
      pagesBaseUrl: string;
    }
  ) {}

  public getPageUrl(pageId: string) {
    return `${this.params.pagesBaseUrl}/${pageId}`;
  }

  private getAllPagesUrl(pageNumber: number): string {
    return `/fragment%3Atop-rated-by-year-0/p/${pageNumber}`;
  }

  private async fetchDocumentHTML(pageNumber: number): Promise<string> {
    const response = await this.params.axios.get<string>(
      this.getAllPagesUrl(pageNumber)
    );
    return response.data;
  }

  public async getPagesByPageNumber(
    pageNumber: number
  ): Promise<Array<IDocument>> {
    let response: string;
    try {
      const html = await this.fetchDocumentHTML(pageNumber);
    } catch (e) {
      throw new DocumentsFetchError(e instanceof Error ? e : undefined);
    }

    return [];
  }
}
