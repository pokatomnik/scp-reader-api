import axios, { AxiosInstance } from 'axios';
import type { IDocumentsResponse } from '../../../domain/document';
import { DocumentsFetchError } from '../../errors';
import type { IPrivateConfiguration } from '../configuration-service';
import { AllDocumentsParser } from './parser-all-docs';
import { RecentDocumentsParser } from './parser-recent-docs';

export class DocumentsService {
  private readonly axios: AxiosInstance;

  private readonly allDocumentsParser = new AllDocumentsParser();

  private readonly recentDocumentsParser = new RecentDocumentsParser();

  public constructor(params: { privateConfiguration: IPrivateConfiguration }) {
    this.axios = axios.create({
      baseURL: params.privateConfiguration.urls.documentsBaseUrl,
    });
  }

  public async getPagesByPageNumber(pageNumber: number): Promise<IDocumentsResponse> {
    try {
      const response = await this.axios.get<string>(
        `/fragment:top-rated-by-year-0/p/${pageNumber}`
      );
      return this.allDocumentsParser.parse(response.data);
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : undefined);
    }
  }

  public async getRecentPagesByPageNumber(pageNumber: number): Promise<IDocumentsResponse> {
    try {
      const response = await this.axios.get<string>(`most-recently-created/p/${pageNumber}`);
      return this.recentDocumentsParser.parse(response.data);
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : undefined);
    }
  }
}
