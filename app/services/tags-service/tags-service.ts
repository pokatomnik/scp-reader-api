import axios, { AxiosInstance } from 'axios';
import type { IPrivateConfiguration } from '../configuration-service';
import type { ITag, PageByTags } from '../../../domain/tag';

export class TagsService {
  private readonly axios: AxiosInstance;

  public constructor(params: { privateConfiguration: IPrivateConfiguration }) {
    this.axios = axios.create({
      baseURL: params.privateConfiguration.urls.tagsBaseUrl,
    });
  }

  public async getTags(): Promise<Array<ITag>> {
    const response = await this.axios.get<Array<string>>(
      '/_api/wikidot_tags_search/list?wiki=scp-ru'
    );
    const tagNames = response.data;
    return tagNames.map((name) => ({ name }));
  }

  public async getDocumentsByTags(tags: Array<string>): Promise<Array<PageByTags>> {
    if (tags.length === 0) {
      throw new Error('Empty tags list');
    }

    const url = tags.reduce((resultUrl, currentTag) => {
      return `${resultUrl}&tag=${encodeURIComponent(currentTag)}`;
    }, '/_api/wikidot_tags_search/find?wiki=scp-ru');

    const response = await this.axios.get<Array<PageByTags>>(url);

    return response.data;
  }
}
