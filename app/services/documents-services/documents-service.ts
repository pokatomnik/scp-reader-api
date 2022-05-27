import axios, { AxiosInstance } from 'axios';
import type { IDocument } from '../../../domain/document';
import { DocumentsFetchError } from '../../../lib/errors';
import type { IPrivateConfiguration } from '../configuration-service';

export class DocumentsService {
  private readonly axios: AxiosInstance;

  public constructor(params: { privateConfiguration: IPrivateConfiguration }) {
    this.axios = axios.create({
      baseURL: params.privateConfiguration.urls.documentsBaseUrl,
    });
  }

  public async getPagesByPageNumber(
    pageNumber: number
  ): Promise<Array<IDocument>> {
    let html: string;
    try {
      const response = await this.axios.get<string>(
        `fragment%3Atop-rated-by-year-0/p/${pageNumber}`
      );
      html = response.data;
    } catch (e) {
      throw new DocumentsFetchError(e instanceof Error ? e : undefined);
    }

    return [];
  }

  public async getRecentPagesByPageNumber(
    pageNumber: number
  ): Promise<Array<IDocument>> {
    let html: string;
    try {
      const response = await this.axios.get<string>(
        `most-recently-created/p/${pageNumber}`
      );
      html = response.data;
    } catch (e) {
      throw new DocumentsFetchError(e instanceof Error ? e : undefined);
    }

    return [];
  }
}
