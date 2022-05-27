import axios, { AxiosInstance } from 'axios';
import type { IPrivateConfiguration } from '../configuration-service';
import type { ITag } from '../../../domain/tag';
import { IDocument } from '../../../domain/document';

export class TagsService {
  private readonly axios: AxiosInstance;

  public constructor(params: { privateConfiguration: IPrivateConfiguration }) {
    this.axios = axios.create({
      baseURL: params.privateConfiguration.urls.tagsBaseUrl,
    });
  }

  public async getTags(): Promise<Array<ITag>> {
    return [];
  }

  public async getDocumentsByTags(tags: Array<ITag>): Promise<Array<IDocument>> {
    return [];
  }
}
